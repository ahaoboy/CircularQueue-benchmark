export class CircularQueue<T> {
  data: T[];

  size: number;

  tail: number;

  head: number;

  constructor(size: number) {
    this.data = Array(size + 1);
    this.size = size + 1;
    this.tail = 1;
    this.head = 0;
  }

  get(i: number) {
    return this.data[(this.head + i + 1) % this.size];
  }

  get length() {
    return (this.tail - this.head + this.size - 1) % this.size;
  }

  // 查看队头元素
  Front() {
    if (this.isEmpty()) return -1;
    return this.data[(this.head + 1) % this.size];
  }

  // 查看队尾元素
  Rear() {
    if (this.isEmpty()) return -1;
    return this.data[(this.tail - 1 + this.size) % this.size];
  }

  // 添加元素
  enQueue(val: T) {
    if (this.isFull()) {
      this.deQueue();
    }
    this.data[this.tail] = val;
    this.tail = (this.tail + 1) % this.size;
    return true;
  }

  // 删除元素
  deQueue() {
    this.head = (this.head + 1) % this.size;
    // delete this.data[this.head]
    this.data[this.head] = undefined;
    return true;
  }

  // 队列是否为空
  isEmpty() {
    return (this.head + 1) % this.size === this.tail;
  }

  // 队列是否已满
  isFull() {
    return this.head === this.tail;
  }
}
