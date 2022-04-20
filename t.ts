import { ArrayQueue } from "./ArrayQueue";
import { CircularQueue } from "./CircularQueue";
const a = new ArrayQueue(4);
a.enQueue(1);
a.enQueue(2);
a.enQueue(3);
a.enQueue(4);
a.enQueue(5);
console.log(a);
const b = new CircularQueue(4);
b.enQueue(1);
b.enQueue(2);
b.enQueue(3);
b.enQueue(4);
b.enQueue(5);
console.log(b);
