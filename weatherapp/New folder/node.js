console.log('hello world');
// jsfiddle.net
// codepen.io 
// jsbin.com tutorial


let calculator = {
    read() {
      this.a = +prompt('Enter a number', 0);
      this.b = +prompt('Enter another number', 0);
    },
  
    sum() {
      return this.a + this.b;
    },
  
    mul() {
      return this.a * this.b;
    }
  }
  
  calculator.read();
  alert(`Sum of numbers: ${calculator.sum()}`);
  alert(`Product of numbers: ${calculator.mul()}`);


  // example of local storage handling
  export const ls = {

    // function to add tasks to local storage
    addToLocalStorage: function (name, item) {
      // convert the array to string and store it.
      window.localStorage.setItem(name, JSON.stringify(item));
    },
  
  
    // function to retrieve data from storage
    getFromLocalStorage: function (name) {
      const storage = window.localStorage.getItem(name);
      // if storage exists
      return (storage !== null) ? JSON.parse(storage) : [];
    }
  }