const app = new Vue({
    el: '#to-do-list',
    data: {
        title: null,
        content: null,
        date: null,
        storageArray: [],
        all_count: 0,
        complete_count: 0,
        undone_count: 0,
    },
    created: function () {
        if (localStorage.getItem('task') === null) {
            localStorage.setItem('task', JSON.stringify(this.storageArray));
        } else {
            this.storageArray = JSON.parse(localStorage.getItem('task'));
        }
    },
    mounted() {
        for (let i = 0; i < this.storageArray.length; i++) {
            this.all_count++;
        }
        for (let i = 0; i < this.storageArray.length; i++) {
            if (this.storageArray[i].status == "已完成")
                this.complete_count++;
        }
        for (let i = 0; i < this.storageArray.length; i++) {
            if (this.storageArray[i].status == "未完成")
                this.undone_count++;
        }
    },
    methods: {
        add_article: function (e) {
            e.preventDefault();
            if (this.title && this.content) {
                this.date = new Date().toLocaleString();
                this.storageArray.push({ title: this.title, content: this.content, date: this.date, editShow: false, status: "未完成" });
                localStorage.setItem('task', JSON.stringify(this.storageArray));
                location.reload();
            }
        },
        edit: function (id) {
            this.storageArray[id].editShow = true;
            localStorage.setItem('task', JSON.stringify(this.storageArray));
        },
        exit_success: function (id) {
            alert("編輯完成");
            let date = new Date().toLocaleString();
            this.storageArray[id].editShow = false;
            this.storageArray[id].date = date;
            if (this.storageArray[id].status == "已完成") {
                this.complete_count++;
                this.undone_count--;
            } else {
                this.undone_count++;
                this.complete_count--;
            }
            localStorage.setItem('task', JSON.stringify(this.storageArray));
        },
        deletes: function (id) {
            let yes = confirm('你確定要刪除嗎？');
            if (yes) {
                alert("刪除完成");
                if (this.storageArray[id].status == "已完成") {
                    this.complete_count--;
                } else {
                    this.undone_count--;
                }
                this.all_count--;
                this.storageArray.splice(id, 1);
                localStorage.setItem('task', JSON.stringify(this.storageArray));
            } else {

            }
        },
        get_task_type: function (e) {
            if (e == "all") {
                this.storageArray = JSON.parse(localStorage.getItem('task'));
            } else {
                let Array = JSON.parse(localStorage.getItem('task'));
                let type = null;
                if (e == "complete") {
                    type = "未完成";
                } else {
                    type = "已完成";
                }
                for (let i = Array.length - 1; i > -1; i--) {
                    if (Array[i].status == type) {
                        Array.splice(i, 1)
                    }
                }
                this.storageArray = Array;
                console.log(Array);
            }
        },
    },
    updated() {
        console.log('view updated')
        this.title = null;
        this.content = null;
        this.date = null;
    }
})
console.log(app.all_count);