var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');

var VERSION = require('./package.json').version;

var DEFAULT_BUILDS_DIR = './builds';
var DEFAULT_IMPLEMENTATIONS_DIR = './implementations';

// default template options/values
var DEFAULT_INITIAL_PAGES = 3;
var DEFAULT_MAX_PAGES = 10;

var TEMPLATE_FILE = path.resolve(__dirname, 'template.hbs');
// load and compile in the template
var template = handlebars.compile(fs.readFileSync(TEMPLATE_FILE, 'utf8'));

// simple function for reading in all the data from a stream
function readStream(stream, done) {
    var data = '';

    stream.setEncoding('utf8');

    stream.on('data', (chunk) => {
        data += chunk;
    });

    stream.on('end', () => {
        done(data.replace(/\n$/, ''));
    });
}

// function to apply template
function build(input, output, done) {
    var outputStream = output === '-'
        ? process.stdout
        : fs.createWriteStream(output);
    var inputStream = input === '-'
        ? process.stdin
        : fs.createReadStream(input);

    readStream(inputStream, (impl) => {
        var data = eval(`module.exports=${impl}`);

        data.version = VERSION;

        // set default values
        data.options = data.options || {};
        data.options.initialPages = data.options.initialPages || DEFAULT_INITIAL_PAGES;
        data.options.maxPages = data.options.maxPages || DEFAULT_MAX_PAGES;

        data.metadata.include = data.metadata.include || [];
        data.metadata.exclude = data.metadata.exclude || [];

        // preprocess optional arrays
        if (!Array.isArray(data.metadata.include)) {
            data.metadata.include = [data.metadata.include];
        }
        if (!Array.isArray(data.metadata.exclude)) {
            data.metadata.exclude = [data.metadata.exclude];
        }

        // convert functions into strings, so template engine can substitute
        // them
        for (var fn in data.code) {
            data.code[fn] = data.code[fn].toString();
        }

        outputStream.write(template(data), done);
    });
}

// function to process all files in input directory
function buildAll(inputDir, outputDir) {
    console.log('Building all files in', inputDir, 'to', outputDir);
    console.log();

    // make sure output directory exists
    try {
        fs.mkdirSync(outputDir);
    } catch (e) {
        // ignore "already exists" error
        if (e.code !== 'EEXIST') {
            throw e;
        }
    }

    // build all implementation files in the input directory
    var files = fs.readdirSync(inputDir);
    (function iter() {
        // stop if there are no more files to process
        if (files.length <= 0) {
            return;
        }
        var filename = files.pop();

        // only build files if they are .js files
        if (filename.endsWith('.js')) {
            var inputFile = path.resolve(inputDir, filename);
            var outputFile = path.resolve(outputDir,
                                            filename.replace(/\.js$/, '.user.js'));
            console.log('Building', filename);
            build(inputFile, outputFile, iter);
        } else {
            iter();
        }
    })();
}

// main program entry point
function main(args) {
    var usage = `
    Usage:
        node make.js INPUT_FILE [OUTPUT_FILE]
        node make.js --all [INPUT_DIR [OUTPUT_DIR]]
        node make.js -h | --help
    `.trim()

    args = args || process.argv.slice(2);

    if (args.length <= 0 || args[0] === '-h' || args[0] === '--help') {
        console.log(usage);
        return;
    }

    if (args[0] === '--all') {
        buildAll(
            args[1] || DEFAULT_IMPLEMENTATIONS_DIR,
            args[2] || DEFAULT_BUILDS_DIR);
    } else {
        build(args[0], args[1] || '-');
    }
}

main();
