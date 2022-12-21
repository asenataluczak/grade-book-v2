export function getDirtyValues(form: any) {
  let dirtyValues: any = {};

  Object.keys(form.controls)
    .forEach(key => {
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls)
          dirtyValues[key] = getDirtyValues(currentControl);
        else
          dirtyValues[key] = currentControl.value;
      }
    });

  return dirtyValues;
}
