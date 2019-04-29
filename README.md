To run project - 
npm install
gulp


Notes -
The original regex in the JSON,I don't feel ot is right, so I changed it, '\\' instead of '\'. However I think '^[^\s]+@[^\s]+\.[^\s]+$' maybe more make sense for me.
change from : "^[^@\s]+@[^@\s]+\.[^@\s]+$"
change to: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"  
