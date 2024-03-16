function lexer(input) {
    const tokens = [];
    let cursor = 0;

    while (cursor < input.length) {
        let char = input[cursor];

        // Skip whitespace
        if (/\s/.test(char)) {
            cursor++;
            continue;
        }

        // Tokenize keywords and identifiers
        if (/[a-zA-Z]/.test(char)) {
            let word = '';
            while (/[a-zA-Z0-9]/.test(char)) {
                word += char;
                char = input[++cursor];
            }

            // Make keyword comparison case-insensitive
            if (word === 'ramRamVariable' || word === 'aashirvad' || word==='agar' || word === 'magar') {
                tokens.push({ type: 'keyword', value: word });
            } else {
                tokens.push({ type: 'identifier', value: word });
            }
            continue;
        }

        // Tokenize numbers
        if (/[0-9]/.test(char)) {
            let num = '';
            while (/[0-9]/.test(char)) {
                num += char;
                char = input[++cursor];
            }
            tokens.push({ type: 'number', value: parseInt(num) });
            continue;
        }

        // Tokenize operators and equal signs
        if (/[\+\-\*\=]/.test(char)) {
            tokens.push({ type: 'operator', value: char });
            cursor++;
            continue;
        }

        
        // Increment cursor for other characters
        cursor++;
    }

    return tokens;
}

function parser(tokens) {
    const ast = {
        type: 'Program',
        body: [],
    }

    while (tokens.length > 0) {
        let token = tokens.shift()
        if (token.type === 'keyword' && token.value === 'ramRamVariable') {
            let declaration = {
                type: 'Declaration',
                name: tokens.shift().value,
                value: null
            };

            if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                tokens.shift(); //consume '='

                let expression = ''; // 10+20
                while (tokens.length > 0 && tokens[0].type !== 'keyword') {
                    expression += tokens.shift().value;
                }
                declaration.value = expression.trim()

            }
            ast.body.push(declaration)
        }

        if (token.type === 'keyword' && token.value === 'aashirvad') {
            ast.body.push({
                type: 'Print',
                expression: tokens.shift().value
            })
        }

    }
    return ast
}


function codeGen(node) {
    switch (node.type) {
        case 'Program': return node.body.map(codeGen).join('\n');

        case 'Declaration': return `let ${node.name} = ${node.value}`

        case 'Print': return `console.log(${node.expression})`

    }
}


function compiler(input) {
    const tokens = lexer(input);
    const ast = parser(tokens);

    const executableCode = codeGen(ast)
    // console.log(tokens)
    // console.log(ast)
    // console.log(executableCode)
    return executableCode

}

function runner(input) {
    eval(input)

}

const code = `
ramRamVariable x = 103,
ramRamVariable y = '-203',

ramRamVariable sum = x-y
aashirvad sum
`;

const exec = compiler(code)

runner(exec)
