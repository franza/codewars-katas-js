function BinaryTree() {}

function EmptyBinaryTree() { Object.freeze(this); }

EmptyBinaryTree.prototype = new BinaryTree();
EmptyBinaryTree.prototype.constructor = EmptyBinaryTree;

EmptyBinaryTree.prototype.isEmpty = function () { return true; };
EmptyBinaryTree.prototype.depth = function () { return 0; };
EmptyBinaryTree.prototype.count = function () { return 0; };

EmptyBinaryTree.prototype.inorder = function (fn) { return this; };
EmptyBinaryTree.prototype.preorder = function (fn) { return this; };
EmptyBinaryTree.prototype.postorder = function (fn) { return this; };

EmptyBinaryTree.prototype.contains = function (x) { return false; };
EmptyBinaryTree.prototype.insert = function (x) { 
  return new BinaryTreeNode(x, new EmptyBinaryTree(), new EmptyBinaryTree()); 
};
EmptyBinaryTree.prototype.remove = function (x) { return this; };
EmptyBinaryTree.prototype.toString = function () {
  return '[]';
};

////////////////////////////////////////////////////////////////////////

function BinaryTreeNode(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
  Object.freeze(this);
}

BinaryTreeNode.prototype = new BinaryTree();
BinaryTreeNode.prototype.constructor = BinaryTreeNode;

BinaryTreeNode.prototype.isEmpty = function () { return false; };
BinaryTreeNode.prototype.depth = function () {
  return 1 + Math.max(this.left.depth(), this.right.depth());
};
BinaryTreeNode.prototype.count = function () {
  return 1 + this.left.count() + this.right.count();
};

BinaryTreeNode.prototype.inorder = function (fn) {
  (this.left.inorder(fn), fn(this.value), this.right.inorder(fn));
};
BinaryTreeNode.prototype.preorder = function (fn) {
  (fn(this.value), this.left.preorder(fn), this.right.preorder(fn));
};
BinaryTreeNode.prototype.postorder = function (fn) {
  (this.left.postorder(fn), this.right.postorder(fn), fn(this.value));
};

BinaryTreeNode.prototype.contains = function (x) {
  return this.value === x || (x < this.value ? this.left : this.right).contains(x);
};
BinaryTreeNode.prototype.insert = function (x) {
  x < this.value ? this.left.insert(x) : this.right.insert(x);
  return this;
};
BinaryTreeNode.prototype.remove = function (x) {
  if (this.value === x) return new EmptyBinaryTree();
  x < this.value ? this.left.remove(x) : this.right.remove(x);
  return this;
};
BinaryTreeNode.prototype.toString = function () {
  return '[ ' + [this.value, this.left, this.right].join(' ') + ' ]';
};

exports.BinaryTree = BinaryTree;
exports.BinaryTreeNode = BinaryTreeNode;
exports.EmptyBinaryTree = EmptyBinaryTree;