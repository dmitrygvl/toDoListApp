export function renderAppUI(rootEl: HTMLElement) {
  rootEl.innerHTML = `
  <main class="main">
    <h1 class="title">Your tasks</h1>
    <section class="task-wrapper">
      <ul class="tasks-List">
      </ul>
    </section>
    <section class="form-wrapper">
      <form>
      <input type="text" class="form-input" palceholder="Enter your task" required autofocus>
      </form>
      <button type="submit" class="form-add-btn">
              Add
            </button>
    </section>
  </main>
  `;
}
