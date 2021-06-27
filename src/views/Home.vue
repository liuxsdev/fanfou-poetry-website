<template>
    <Poetry :id="random_id" />
</template>
<script>
import { get_random_uid } from "../libs/poetry";
import Poetry from "../components/Poetry.vue";

export default {
    name: "Home",
    props: ["id"],
    components: { Poetry },
    computed: {
        random_id() {
            let id = String(this.id);
            if (this.id == "") {
                id = get_random_uid();
            }
            return id;
        },
    },
};
</script>
