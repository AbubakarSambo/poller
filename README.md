# poller

The pollapp is designed to be the api service for a real time situation room during the elections. 
party agents from all the political parties in Nigeria can send sms messages of a polling unit code and action e.g "1 AB001".
This text message hits the africastalking server which then forwards the message to this api for onward processing. 
The api stores in the information, and feeds a client App that can show real time results as they come in
