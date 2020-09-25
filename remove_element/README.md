# remove element 

문제 설명 
- 해당 어레이와 숫자 val이 주어질때 val을 어레이에서 제거하고 남은 array의 길이를 리턴

example

- given nums = [1,3,2, 3], val = 3
- expected return 2 

힌트
- 투포인터를 사용하라는 힌트

## 정답풀이 
```python
class Solution(object):
  def removeElement(nums, val):
    next = 0
    for i, num in enumerate(nums):
      if num != val:
        nums[next] = num
        next += 1
    return next 
 '''
  memory: 13.5 MB
 '''   
```

```golang
func removeElement(nums []int, val int) int {
    next := 0
    for _, num := range nums {
        if num != val {
            nums[next] = num
            next = next + 1
        }
    }
    return next
}
// memory: 2.1 MB
```

하아.. 같은 로직으로 했는데 메모리 차이가 6배가 넘는다. 
아직 go는 문법 기초도 못 잡았는데 얼렁 공부하라는 계시인가 보다....