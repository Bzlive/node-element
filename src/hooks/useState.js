const Hooks = (function () {
  const fiber = {
    state: null, // 存储 state
    updateQueue: [], // 更新队列
    index: 0, // 当前更新索引
  }

  function useState(initialState) {
    // 初始化 state
    if (fiber.state === null) {
      fiber.state = [initialState]
    }

    // 当前 state
    const currentIndex = fiber.index;
    let state = fiber.state[currentIndex]

    function setState (newState) {
      // 将更新 state 添加到队列
      fiber.updateQueue.push({
        index: currentIndex,
        newState
      })

      // 更新渲染
      scheduleRender()
    }

    function scheduleRender() {
      fiber.updateQueue.forEach(({ index, newState }) => {
        fiber.state[index] = newState
      })

      state = fiber.state[currentIndex]

      // 清空
      fiber.updateQueue = []
      fiber.index = 0
    }

    fiber.index++

    return [state, setState]
  }

  return { useState }
})()


export default Hooks
