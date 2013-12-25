var Test = require("kata-test-framework-js/index").Test;
var EmptyBinaryTree = require("./code").EmptyBinaryTree;


Test.describe("Simple tree operations", function() {
  var mt, t1, t2, t3;
  
  Test.before(function() {
    mt = new EmptyBinaryTree();
    t1 = mt.insert('b').insert('a').insert('c');
    t2 = t1.remove('a');
    t3 = t1.remove('z');
  });
  
  Test.it("Basic tree counting", function() {
    Test.expect(mt.isEmpty(), "Empty tree isEmpty()");
    Test.expect(!t1.isEmpty(), "Non-empty tree is not isEmpty()");
    Test.expect(mt.depth() === 0, "Empty tree has depth zero.");
    Test.expect(t1.depth() === 2, "Tree [ a, [ b [] [] ] [ c [] [] ] ] depth 2");
    Test.expect(mt.count() === 0, "Empty tree has zero non-empty nodes");
    Test.expect(t1.count() === 3, "Tree a, b, c has three nodes");
  });
  
  Test.it("Simple tests of insert", function() {
    Test.expect(!mt.contains('a'), "Empty tree does not contain 'a'");
    Test.expect(t1.contains('a'), "Tree a, b, c contains 'a'");
    Test.expect(t1.contains('b'), "Tree a, b, c contains 'b'");
    Test.expect(t1.contains('c'), "Tree a, b, c contains 'c'");
  });
  
  Test.it("Simple tests of remove", function() {
    Test.expect(!t2.contains('a'), "Tree a, b, c no longer contains 'a' after remove");
    Test.expect(t2.right === t1.right, "Tree a, b, c with 'a' removed shares 'c'");
    Test.expect(t3 === t1, "Removing an absent item leaves tree untouched.");
  });
  
  Test.it("Traversal", function() {
    var doTraversal = function(tree, traversal) {
      var nodes = [];
      tree[traversal](function(x) { return nodes.push(x); });
      return nodes.join('');
    };
  
    Test.expect(doTraversal(mt, 'inorder') === '', "Traverse empty tree");
    Test.expect(doTraversal(t1, 'inorder') === 'abc', "Traverse inorder");
    Test.expect(doTraversal(t1, 'preorder') === 'bac', "Traverse preorder");
    Test.assertEquals(doTraversal(t1, 'postorder'), 'acb', "Traverse postorder");
  });
});
