export {};

class Stack<D> {
  private items: D[] = [];

  push(item: D) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }
}


const numberStack = new Stack<number>();

numberStack.push(10);
numberStack.pop()


const stringStack = new Stack<string>();

