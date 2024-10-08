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

  return AsciinemaPlayer.create({data}, document.getElementById('player'));
}
