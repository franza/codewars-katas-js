function BinaryTree() {}

function BinaryTreeNode(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
  Object.freeze(this);
}
BinaryTreeNode.prototype = new BinaryTree();
BinaryTreeNode.prototype.constructor = BinaryTreeNode;

BinaryTreeNode.prototype.isEmpty = function() { return true; };
BinaryTreeNode.prototype.depth = function() { return 0; };
BinaryTreeNode.prototype.count = function() { return 0; };

BinaryTreeNode.prototype.inorder = function(fn) { return this; };
BinaryTreeNode.prototype.preorder = function(fn) { return this; };
BinaryTreeNode.prototype.postorder = function(fn) { return this; };

BinaryTreeNode.prototype.contains = function(x) { return false; };
BinaryTreeNode.prototype.insert = function(x) { 
  return new BinaryTreeNode(x, new EmptyBinaryTree(), new EmptyBinaryTree()); 
};
BinaryTreeNode.prototype.remove = function(x) { return this; };

////////////////////////////////////////////////////////////////////////
function EmptyBinaryTree() { Object.freeze(this); }
EmptyBinaryTree.prototype = new BinaryTree();
EmptyBinaryTree.prototype.constructor = EmptyBinaryTree;

EmptyBinaryTree.prototype.isEmpty = function() { return false; };
EmptyBinaryTree.prototype.depth = function() {
  return 1 + Math.max(this.left.depth(), this.right.depth());
};
EmptyBinaryTree.prototype.count = function() {
  return 1 + this.left.count() + this.right.count();
};

EmptyBinaryTree.prototype.inorder = function(fn) {
  (this.left.inorder(fn), fn(this.value), this.right.inorder(fn));
};
EmptyBinaryTree.prototype.preorder = function(fn) {
  (fn(this.value), this.left.preorder(fn), this.right.preorder(fn));
};
EmptyBinaryTree.prototype.postorder = function(fn) {
  (this.left.postorder(fn), this.right.postorder(fn), fn(this.value));
};

EmptyBinaryTree.prototype.contains = function(x) {
  return this.value === x || (x < this.value ? this.left : this.right).contains(x);
};
EmptyBinaryTree.prototype.insert = function(x) {
  x < this.value ? this.left.insert(x) : this.right.insert(x);
};
EmptyBinaryTree.prototype.remove = function(x) {
  if (this.value === x) return new EmptyBinaryTree();
  x < this.value ? this.left.remove(x) : this.right.remove(x);
  return this;
};

exports.BinaryTree = BinaryTree;
exports.BinaryTreeNode = BinaryTreeNode;
exports.EmptyBinaryTree = EmptyBinaryTree;