export class ArrayQueue<T> {
  data: T[];

  size: number;

  tail: number;

  head: number;

  constructor(size: number) {
    this.data = [];
    this.size = size;
  }

  get(i: number) {
    return this.data[i];
  }

  get length() {
    return this.data.length;
  }

  // 查看队头元素
  Front() {
    if (this.isEmpty()) return -1;
    return this.data[0];
  }

  // 查看队尾元素
  Rear() {
    if (this.isEmpty()) return -1;
    return this.data[this.size - 1];
  }

  // 添加元素
  enQueue(val: T) {
    this.data.unshift(val);
    while (this.data.length > this.size) {
      this.data.pop();
    }
    return true;
  }

  // 删除元素
  deQueue() {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.size;
    // delete this.data[this.head]
    this.data[this.head] = undefined;
    return true;
  }

  // 队列是否为空
  isEmpty() {
    return this.data.length === 0;
  }

  // 队列是否已满
  isFull() {
    return this.data.length === this.size;
  }
}
