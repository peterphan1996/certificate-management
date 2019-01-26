import MerkleTree from 'merkletreejs';
import keccak256 from 'keccak256';

const buf2hex = x => `0x${x.toString('hex')}`;

export const verify = async (MyContract, proof, root, leaf) => {
  const hashedLeaf = buf2hex(keccak256(leaf));
  const verified = await MyContract.methods
    .verify(proof, root, hashedLeaf)
    .call();
  return verified;
};

export const createMT = data => {
  const leaves = data.map(x => keccak256(x)).sort(Buffer.compare);
  const tree = new MerkleTree(leaves, keccak256);
  const root = buf2hex(tree.getRoot());
  const proofs = [];
  for (let i = 0; i < leaves.length; i++) {
    const proof = tree.getProof(keccak256(data[i])).map(x => buf2hex(x.data));
    proofs.push(proof);
  }
  return { proofs, MTRoot: root };
};
