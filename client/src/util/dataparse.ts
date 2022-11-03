const delimiter = ",-(){}[]'\"\\/;:?.|";

const dualDelimiter = "(){}[]'\"";

export const delimiterMap = new Map<string, string>([
    [")", "("],
    ["}", "{"],
    ["]", "["],
    ["'", "'"],
    ['"', '"'],
]);

const isDelimiter = (char: string): boolean => {
    return delimiter.includes(char);
  };

export const isDualDelimiter = (char: string): boolean => {
    return dualDelimiter.includes(char);
    };

const isValid = (text: string): boolean => {
    const stack: string[] = [];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (isDualDelimiter(char)) {
            if (stack.length === 0) {
                stack.push(char);
            } else {
                const last = stack[stack.length - 1];
                if (last === delimiterMap.get(char)) {
                    stack.pop();
                } else {
                    stack.push(char);
                }
            }
        }
    }
    return stack.length === 0;
};

const checkNested = (text: string): boolean => {
    let lastDelim = "";
    for (let i = 0; i < text.length; i++) {
        if (isDualDelimiter(text[i])) {
            if (lastDelim === "") {
                lastDelim = text[i];
            } else {
                if (delimiterMap.get(text[i]) === lastDelim) {
                    lastDelim = "";
                } else {
                    return true;
                }
            }
        }
    }
    return false;
}

export const SplitIntoBlocks = (text: string): Block[] => {
    if (!isValid(text)) {
        throw new Error("Invalid text");
    }

    if (checkNested(text)) {
        throw new Error("Nested delimiters");
    }
  const newBlocks: Block[] = [];
  let i = 0;
  while (i < text.length) {
    let j = i;
    while (j < text.length && !isDelimiter(text[j])) {
      j++;
    }
    let delim = text[j];

    if (dualDelimiter.includes(delim)) {
        if (!delimiterMap.has(delim)) {
            delim = ""
        }
    }


    newBlocks.push({
      text: text.substring(i, j),
      understanding: 1,
      delimiter: delim,
    });
    i = j + 1;
  }
  return filterEmptyBlocks(newBlocks);
}

const filterEmptyBlocks = (blocks: Block[]): Block[] => {
    return blocks.filter((block) => !(block.text.trim() === "" && block.delimiter === ""));
    };

export const JoinBlocks = (blocks: Block[]): string => {
    let text = "";
    blocks.forEach((block) => {
        let x = block.text;
        if ( block.delimiter != "" && block.delimiter !== undefined) {
        if (dualDelimiter.includes(block.delimiter)) {
            x = delimiterMap.get(block.delimiter) + x + block.delimiter;
        } else {
            x += block.delimiter;
        }
    }
        text += x;
    });
    return text;
    }