// commands.js

const outputElement = document.getElementById('output');

const posts = [
    { key: "1", title: "Lindiwe Moonlight Jellyfish Guide", path: "posts/jellyfish-guide.html", date: "24/12/2024" },
    { key: "2", title: "Jellyfish price analysis", path: "posts/jellyfish-prices.html", date: "24/10/2024" },
    { key: "3", title: "Debugging like a Pro", path: "posts/post3.html", date: "--/--/2024" },
];

async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch {
        return 'user';
    }
}

function executeCommand(command) {
    const args = command.trim().split(/\s+/);
    const cmd = args[0];

    if (cmd === "ls") {
        outputElement.innerHTML += "\nAvailable posts:\n" + posts.map(post => `  ${post.key} - ${post.title} | ${post.date}`).join("\n");
    } else if (cmd === "cat" && args[1]) {
        const post = posts.find(p => p.key === args[1]);
        if (post) {
            window.location.href = post.path;
        } else {
            outputElement.innerHTML += `\nError: Post "${args[1]}" not found.`;
        }
    } else {
        outputElement.innerHTML += "\nError: Command not recognized.";
    }
}

function handleCommand(event) {
    if (event.key === 'Enter') {
        const commandInput = event.target;
        const command = commandInput.value;
        const promptText = document.querySelector(".prompt").textContent;
        outputElement.innerHTML += `\n${promptText} ${command}`;
        executeCommand(command);
        commandInput.value = '';

        // Scroll to the bottom of the terminal
        const terminal = document.querySelector('.terminal');
        terminal.scrollTop = terminal.scrollHeight;
    }
}