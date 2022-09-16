# LRU cache
LRU stands for `Least Recently Used`.  
Suppose have a cache which is capable of holding a maximum of `N` items and we have already reached the maximum limit. Now to add a new element to the cache, as per LRU policy we remove the `least recently used` element from the cache and add the new item.

### Constraints
As the name suggests it's a `cache` so the read and write operations has to be done in constant time i.e. O(1)  

### Approaches
#### Approach 1 (Map)
`HashMap` supports read/write operation in constant time so we can use a map to store the key/value pairs.  
*But in that case how would we identify the least recently used item?*

#### Approach 2 (List)
We can maintain a list of elements where the element at the start can be the most recently used element and element at the end can be the least recently used element.  
*What would be the time complexity of read/write operations?*  
Ok, so write operation can be performed in O(1) if it's a linked list as that will involve changing a few pointers here and there. But read will take O(N) because we will have to do linear search on the list.  

#### Approach 3 (Hybrid - Map + List)
Ok, so let's use a hybrid approach in that case where we will read/write using map and maintain order of elements using linked list.   

*How will you do the read operation?*  
To read a value we check if it's there in the cache. If the value is not found in the cache we return an error or if the value is found in the cache then we return the value.  
But note that since we have accessed this key so this key now becomes the most recently used key so we have to move this node to the head of linked list.

*Ok and how do you know the node that corresponds to this key?*  
Hmmm...interesting! Ok so in map instead of maintaining the key-value pairs we will maintain key-node pairs and once we know the node, we know the value and that makes read operation O(1)

*And how about write operation?*  
So write is basically simple. If the cache is full we remove the tail node of the linked list and remove the key-node pair from the map. Now we add the new key to the head of the linked list and add key-node pair to map. This complete operation can be performed in O(1)

### Implementation (Hydrib Approach)
```javascript
// Represent a `Node` in linked list
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }  
}

// Represent a `DoublyLinkedList`
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // add a node to the head of the list
  // and returns the new node
  addFirst(value) {
    const node = new Node(value);
    if (this.head === null) {
      // this is the first node in the linked list
      // so it is both the head and the tail
      this.head = node;
      this.tail = node;
    } else {
      // add the node to the head of the linked list
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
    return node;
  }

  // remove the node from the tail of the linked list
  removeLast() {
    if (this.tail !== null) {
      if (this.head == this.tail) {
        // there is only one node so linked list becomes empty
        this.head = null;
        this.tail = null;
      } else {
        // remove the last node
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
      this.size--;
    }
  }


  // remove the given node from the linked list
  // assuming that the node exists
  remove(node) {
    if (this.head == this.tail) {
      // node to be deleted is the only node
      this.head = null;
      this.tail = null;
    } else if (this.head == node) {
      // node to be deleted is the head
      this.head = this.head.next;
      this.head.prev = null;
    } else if (this.tail == node) {
      // node to be deleted is the tail
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      // node to be deleted is in the middle
      node.prev.next = node.next;
      node.next.prev = node.prev;      
    }
    this.size--;
  }

  print() {
    let node = this.head;
    let output = '';
    while (node !== null) {
      output += node.value + ' ';
      node = node.next;
    }
    console.log(output);
  }
}


// Represent a `LRUCache`
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.list = new LinkedList();
  }

  // get the value of the key if the key exists in the cache
  get(key) {
    // check if the key is in the map
    if (!this.map.has(key)) throw 'Key not found';
    // get the node from the map
    const oldNode = this.map.get(key);
    const value = oldNode.value;
    // remove the existing node from the linked list
    this.list.remove(oldNode);
    // add new node to the head of the linked list
    let newNode = this.list.addFirst(value);
    // add the new node to the map
    this.map.set(key, newNode);
    // return the value
    return value;
  }

  // put the value of the key if the key is not already in the cache
  put(key, value) {
    // check if the key is in the map
    if (this.map.has(key)) {
      // get the node from the map
      const oldNode = this.map.get(key);
      // remove the existing node from the linked list
      this.list.remove(oldNode);
    } else if (this.list.size == this.capacity) {
      // remove the entry of the last node from the map
      this.map.delete(this.list.tail.value);
      // remove the last node from the linked list
      this.list.removeLast();
    }
    // add new node to the head of the linked list
    let newNode = this.list.addFirst(value);
    // add the new node to the map
    this.map.set(key, newNode);
  }

  print() {
    this.list.print();
  }
}


// Test the `LRUCache` class
const cache = new LRUCache(4);
cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);
cache.put(4, 4);
cache.print(); // 4 3 2 1
cache.put(1, 1);
cache.put(2, 2);
cache.print(); // 2 1 4 3
cache.put(5, 5);
cache.print(); // 5 2 1 4
cache.put(1, 1);
cache.put(2, 2);
cache.print(); // 2 1 5 4
cache.put(3, 3);
cache.print(); // 3 2 1 5
cache.put(4, 4);
cache.print(); // 4 3 2 1
cache.put(5, 5);
cache.print(); // 5 4 3 2
console.log(cache.get(3)); // 3
cache.print(); // 3 5 4 2
console.log(cache.get(2)); // 2
cache.print(); // 2 3 5 4
console.log(cache.get(2)); // 2
cache.print(); // 2 3 5 4
// console.log(cache.get(1)); // Key not found
```


