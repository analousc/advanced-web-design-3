document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        // INSERT YOUR CONFIG OBJECT BELOW
        apiKey: "AIzaSyDlWTBPDixPvW5VWFlnDHj7Ywasx16eMcA",
        authDomain: "project-3-ffb4f.firebaseapp.com",
        databaseURL: "https://project-3-ffb4f-default-rtdb.firebaseio.com",
        projectId: "project-3-ffb4f",
        storageBucket: "project-3-ffb4f.appspot.com",
        messagingSenderId: "577943809167",
        appId: "1:577943809167:web:1b7059c12c057c9640d4fa",
        measurementId: "G-FFPHVSWJXY"
    };

    firebase.initializeApp(firebaseConfig);

    //project form
    let messagesRef = firebase.database().ref('Collected Data');

    document.getElementById('contactForm').addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // Get values
        let thought = getInputVal('thought');

        saveMessage(thought);
        document.getElementById('contactForm').reset();
    }

    // Function to get form values
    function getInputVal(id) {
        return document.getElementById(id).value;
    }

    // Function to save the message to firebase
    function saveMessage(thought) {
        let newMessageRef = messagesRef.push();
        newMessageRef.set({
            thought: thought
        });
    }

    // Function to display data
    function displayData() {
        messagesRef.on('child_added', function (snapshot) {
            let dataDisplay = document.getElementById('dataDisplay');
            let childData = snapshot.val();
    
            // Access the 'thought' property correctly
            const thoughtElement = `<div class="thought-item" style="color: red; font-family: 'your-font-family', sans-serif; position: absolute; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;">${childData.thought}</div>`; 
            dataDisplay.innerHTML += thoughtElement;
        });
    }
    

    // Call displayData to show data on page load
    displayData();
});