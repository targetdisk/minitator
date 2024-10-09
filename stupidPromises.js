async function read_as_text(file) {

  // Create a FileReader instance
  const reader = new FileReader();

  // Promise to handle the file reading completion
  const readPromise = new Promise((resolve, reject) => {

    // Set up the onload event handler to resolve the promise with the reader's result
    reader.onload = () => resolve(reader.result);

    // Set up the onerror event handler to reject the promise in case of an error
    reader.onerror = () => reject(reader.error);
  });

  // Read the file as text
  reader.readAsText(file);

  // Await the promise to get the file content
  try {
    // Wait for the file reading to complete
    const content = await readPromise;

    // Define a variable to store the text content of the file
    const text = String(content);

    // Return the text we found.
    return text;

  } catch (error) {
    // Handle errors, such as file read errors
    console.error('Error reading file:', error);
  }

  // Return nothing.
  return '';
}

async function mk_player(file) {
  const data = await read_as_text(file);
  const player = AsciinemaPlayer.create({data}, document.getElementById('player'));

  player.addEventListener('marker', ({ index, time, label }) => {
    document.getElementById('time-td').innerHTML = `${time}`;
  });

  player.addEventListener('pause', () => {
    document.getElementById('time-td').innerHTML = `${player.getCurrentTime()}`;
  });

  player.addEventListener('play', () => {
    document.getElementById('time-td').innerHTML = `${player.getCurrentTime()}`;
  });

  player.addEventListener('playing', () => {
    document.getElementById('time-td').innerHTML = `${player.getCurrentTime()}`;
  });

  player.addEventListener('ended', () => {
    document.getElementById('time-td').innerHTML = `${player.getDuration()}`;
  });

  player.addEventListener('input', ({data}) => {
    document.getElementById('time-td').innerHTML = `${player.getCurrentTime()}`;
    document.getElementById('input-td').innerHTML = `${data[0]}`;
  });

  addEventListener('keydown', () => {
    document.getElementById('time-td').innerHTML = `${player.getCurrentTime()}`;
  });

  const goto_text = document.getElementById("goto-text");
  const goto_button = document.getElementById("goto-button");

  goto_button.addEventListener('click', () => {
    console.log("Go!");
    try {
      player.seek(JSON.parse("[" + goto_text.value + "]")[0]);
    } catch (err) { (0); }
  });

  goto_text.addEventListener('input', () => {
    console.log("Go!");
    try {
      player.seek(JSON.parse("[" + goto_text.value + "]")[0]);
    } catch (err) { (0); }
  });
}
