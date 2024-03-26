export function renderAppUI(rootEl: HTMLElement) {
  rootEl.innerHTML = `
  <main class="container">
   <h1>Your tasks</h1>
   <section class="card mb-4">
      <ul id="tasksList" class="list-group list-group-flush"></ul>
   </section>
   <section class="card">
      <div class="card-body">
       <form id="form">
         <div class="form-group">
            <input
              type="text"
              autocomplete="off"
              class="form-control"
              id="taskInput"
              placeholder="Enter your task"
              required autofocus
            />
          </div>
          <button type="submit" class="add-btn btn-primary btn-lg active">
            Add
          </button>
        </form>
      </div>
    </section>
  </main>
  `;
}
