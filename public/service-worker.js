self.addEventListener("push", (event) => {
   const data = event.data.json();
   const { title, body } = data;
 
   self.registration.showNotification(title, {
     body,
     icon: "/students.svg", // Add an icon for notifications
   });
 });