<template>
  <div class="row">
    <div class="col-2">
      <button class="btn btn-secondary button" @click="sort">
        To original order
      </button>
    </div>

    <div
      class="col-6"
      style="overflow-y: auto; max-height: 400px; touch-action: pan-y"
    >
      <h3>Transition</h3>
      <draggable
        class="list-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="timetable" 
        v-bind="dragOptions"
        :animation="150"
        @start="drag = true"
        @end="drag = false"
        item-key="id" 
      >
        <template #item="{ element }">
          <li class="list-group-item">
            <i
              :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
              @click="element.fixed = !element.fixed"
              aria-hidden="true"
            ></i>
            {{ element.choreography.name }} <!-- Display choreography name -->
          </li>
        </template>
      </draggable>
    </div>

    <rawDisplayer class="col-3" :value="timetable" title="List" />
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import draggable from "vuedraggable";
import rawDisplayer from "./RawDisplayer.vue";
import { getTimetable } from "../../api/GET/Competition";

const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs",
];

const timetable = ref([]);


const list = ref(
  message.map((name, index) => ({
    name,
    order: index + 1,
  }))
);

const drag = ref(false);

const dragOptions = computed(() => ({
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost",
}));

const sort = () => {
  list.value = list.value.sort((a, b) => a.order - b.order);
};

onMounted(async () => {
  try {
    const fetchedTimetable = await getTimetable();
    timetable.value = fetchedTimetable.map(item => ({
      id: item.id,
      groupNumber: item.group_number,
      order: item.order,
      day: item.day,
      startingNumber: item.starting_number,
      competitionId: item.competition_id,
      choreography: {
        id: item.choreography.id,
        name: item.choreography.name,
        organizationName: item.choreography.organization_name,
        country: item.choreography.country,
        address: item.choreography.address,
        typeAgeCategory: item.choreography.type_age_category.name,
        typeDiscipline: item.choreography.type_discipline.name,
        typeSubDiscipline: item.choreography.type_sub_discipline.name,
        typePerformanceCategory: item.choreography.type_performance_category.name,
        typeGroupSize: item.choreography.type_group_size.name
      },
      startTime: item.start_time
    }));
  } catch (error) {
    console.error("Error fetching timetable:", error);
  }
});
</script>

<style>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
