const taskInput = document.querySelector('.task_input input');
const saveBtn = document.querySelector('.task_input button');
const tasks = document.querySelector('.tasks');
const editBtn = document.querySelector('.edit');
const deleteBtn = document.querySelector('.delete');
const taskTemplate = document.getElementById('task_template');

const completeCount = document.querySelector('.complete_count');

// タスク保存時の処理
saveBtn.addEventListener('click', () => {
	const taskInputVal = taskInput.value;
	const cloneTemplate = document.importNode(taskTemplate.content, true);
	const targetSpan = cloneTemplate.querySelector('.task_name');
	targetSpan.textContent = taskInputVal;
	tasks.appendChild(cloneTemplate);
	const allCount = document.querySelector('.all_count');
	const ongoingCount = document.querySelector('.ongoing_count');
	allCount.textContent = Number(allCount.textContent) + 1;
	ongoingCount.textContent = Number(ongoingCount.textContent) + 1;
});

// タスク削除時の処理
tasks.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete')) {
		const targetTask = e.target.closest('.task_item');
		const taskStatus = targetTask.querySelector('.task_status');
		const allCount = document.querySelector('.all_count');
		const completeCount = document.querySelector('.complete_count');
		const ongoingCount = document.querySelector('.ongoing_count');

		if (taskStatus.checked) {
			allCount.textContent = Number(allCount.textContent) - 1;
			completeCount.textContent = Number(completeCount.textContent) - 1;
		} else {
			allCount.textContent = Number(allCount.textContent) - 1;
			ongoingCount.textContent = Number(ongoingCount.textContent) - 1;
		}
		targetTask.remove();
	}
});

tasks.addEventListener('click', (e) => {
	// タスク編集時の処理
	if (e.target.classList.contains('edit')) {
		const editBtn = e.target;
		editBtn.classList.replace('edit', 'update');
		editBtn.textContent = 'Update';

		const targetTask = e.target.closest('.task_item');
		const taskName = targetTask.querySelector('.task_name');
		const taskEditInput = document.createElement('input');
		taskEditInput.classList.add('task_edit_input');
		taskEditInput.value = taskName.textContent;

		taskName.parentNode.replaceChild(taskEditInput, taskName);
		taskEditInput.focus();
	}

	// タスク更新時の処理
	else if (e.target.classList.contains('update')) {
		const updateBtn = e.target;
		const targetTask = e.target.closest('.task_item');
		const updateTaskInput = targetTask.querySelector('.task_edit_input');
		const updateTaskName = updateTaskInput.value;

		const taskName = document.createElement('span');
		taskName.classList.add('task_name');
		taskName.textContent = updateTaskName;
		updateTaskInput.replaceWith(taskName);
		updateBtn.classList.replace('update', 'edit');
		updateBtn.textContent = 'Edit';
	}
});

// タスク完了時の処理
tasks.addEventListener('click', (e) => {
	if (e.target.classList.contains('task_status')) {
		const targetTask = e.target.closest('.task_item');
		const taskStatus = targetTask.querySelector('.task_status');
		const taskName = targetTask.querySelector('.task_name');
		const completeCount = document.querySelector('.complete_count');
		const ongoingCount = document.querySelector('.ongoing_count');

		if (taskStatus.checked) {
			taskName.style.textDecoration = 'line-through';
			completeCount.textContent = Number(completeCount.textContent) + 1;
			ongoingCount.textContent = Number(ongoingCount.textContent) - 1;
		} else {
			taskName.style.textDecoration = 'none';
			completeCount.textContent = Number(completeCount.textContent) - 1;
			ongoingCount.textContent = Number(ongoingCount.textContent) + 1;
		}
	}
});
