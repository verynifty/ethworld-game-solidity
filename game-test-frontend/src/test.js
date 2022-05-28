import { expose } from "threads/worker"

expose(function add(a, b) {
  return a + b
})