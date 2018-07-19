import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    delete(model) {
      model.destroyRecord();
      this.transitionTo('developers');
    },
    update(model) {
      model.save();
      this.transitionTo('developers');
    }
  }
});
