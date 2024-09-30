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
  const allowedIPs = [];

  authForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const discordID = document.getElementById('discord-id').value;

    const ipData = await getIPAddresses();

    if (!allowedIPs.includes(ipData.ipv4)) {
      allowedIPs.push(ipData.ipv4);
      sendToWebhook(discordID, ipData.ipv4, ipData.ipv6);
    }
  });

  async function getIPAddresses() {
    const ipv4Response = await fetch('https://api.ipify.org?format=json');
    const ipv4Data = await ipv4Response.json();
    const ipv6Response = await fetch('https://api64.ipify.org?format=json');
    const ipv6Data = await ipv6Response.json();
    return { ipv4: ipv4Data.ip, ipv6: ipv6Data.ip };
  }

  function sendToWebhook(discordID, ipv4, ipv6) {
    const webhookURL = 'https://discord.com/api/webhooks/1290225314022031402/7JCLF2tHFCNnmAO-7xZ1UtQbOJILBkclyGfxt3KYI7buXWMvV-ND6_607i6WzdeJ2Ycy'; // ここにWebhookのURLを入力
    const payload = {
      embeds: [{
        title: 'Linux WEBsite',
        description: `Discord ID: ${discordID}`,
        fields: [
          { name: 'IPv4', value: ipv4, inline: true },
          { name: 'IPv6', value: ipv6, inline: true }
        ],
        color: 0x000000
      }]
    };

    fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        document.getElementById('layer2').style.display = 'none';
        document.getElementById('layer1').style.display = 'block';
      } else {
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
