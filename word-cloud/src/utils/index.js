// export const flatMap = (lambda) => {
//   return Array.prototype.concat([], this.map(lambda))
// }

export function count(arr) {
  return arr.reduce((m, e) => {
    m[e] = (+m[e] || 0) + 1;
    return m;
  }, {})
}


export function wordsToD3Cloud(words) {
  return Object.entries(count(words))
    .filter(x => x[1] > 1).map(x => ({text: x[0], value: x[1] * 40 }));
};


export function isStopWord(word) {
  return words.includes(word);
}



export function tokenizeText(review) {
  return review
        .split(' ')
        .map(x => x.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\d+]/g, ''))
        .map(x => x.toLowerCase())
        .filter(x => isStopWord(x) == false);
}

export function tokenizeReviews(reviews) {
  const reviewWords = reviews ? reviews.flatMap(x => tokenizeText(x.content.label)) : [];
  return wordsToD3Cloud(reviewWords);
}
// test
export const fontSizeMapper = word => word.value / 10;
// tests
export const rotate = word => (word.value % 90) - 45;

const words = [
  'about', 'after', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be',
  'because', 'been', 'before', 'being', 'between', 'both', 'but', 'by', 'came', 'can',
  'come', 'could', 'did', 'do', 'each', 'for', 'from', 'get', 'got', 'has', 'had',
  'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into',
  'is', 'it', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must',
  'my', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'out', 'over',
  'said', 'same', 'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than',
  'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were',
  'what', 'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your', 'a', 'i', "it's", "i'm"];

