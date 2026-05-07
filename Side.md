# Side.md — Fixed Left Side “Donar” Button Implementation Plan

## Objective

Convert the current `Donar` button into a **fixed side button positioned on the left side of the screen**, keeping:

* Visual consistency with the existing futuristic/cyber UI.
* Full compatibility with desktop and mobile layouts.
* No interference with the canvas or gameplay controls.
* Existing modal functionality unchanged.

The current button is defined in `index.html` and positioned through `layout.css`.  

---

# 1. Analyze the Current Structure

## Current Situation

The button currently exists as:

```html
<button id="donateButton" class="btn">Donar</button>
```

inside the normal document flow below the `<canvas>`. 

And it is positioned using Grid Layout rules:

```css
body > #donateButton {
  grid-row: 4;
  grid-column: 1 / -1;
  margin: 15vh auto 8px auto;
}
```

in `layout.css`. 

This means:

* The button currently occupies layout space.
* It moves with the page flow.
* It is not independent from the grid system.

---

# 2. Remove the Button From the Grid Layout

## Goal

Transform the button into an overlay/floating element independent of the grid.

## Actions

### In `layout.css`

Remove or comment out:

```css
body > #donateButton {
  grid-row: 4;
  grid-column: 1 / -1;
  margin: 15vh auto 8px auto;
}
```

This prevents the button from reserving layout space.

---

# 3. Create Dedicated Fixed-Side Styling

## Goal

Add a specialized style block for the side button.

## Recommended Location

Add the styles in:

```css
/components/buttons.css
```

because the button already inherits `.btn`. 

---

# 4. Implement Fixed Positioning

## Add a Specific Rule for `#donateButton`

Create a dedicated block like:

```css
#donateButton {
  position: fixed;
}
```

This detaches the button from the document flow and anchors it to the viewport.

---

# 5. Define the Left Side Placement

## Suggested Base Position

```css
left: 16px;
top: 50%;
transform: translateY(-50%);
```

This produces:

* Vertical centering.
* Consistent spacing from the left edge.
* Stable placement during scroll.

---

# 6. Add Proper Layering (z-index)

## Goal

Ensure the button stays above:

* Canvas
* Game elements
* Effects
* Background layers

Recommended:

```css
z-index: 1000;
```

---

# 7. Preserve Visual Consistency

The button already inherits the `.btn` futuristic style from `buttons.css`. 

Only add positioning-related rules to avoid style duplication.

Recommended approach:

```css
#donateButton {
  /* positioning only */
}
```

Avoid redefining:

* gradients
* fonts
* shadows
* hover effects

since `.btn` already handles them.

---

# 8. Improve Side-Button Appearance

## Optional Enhancements

### Option A — Vertical Button

Rotate the button vertically:

```css
transform: translateY(-50%) rotate(-90deg);
```

Pros:

* More compact side-tab appearance.
* Modern “floating tab” feel.

Cons:

* Slightly harder to read on mobile.

---

### Option B — Standard Horizontal Button

Keep horizontal orientation:

```css
transform: translateY(-50%);
```

Pros:

* Better readability.
* Simpler interaction.

Recommended as the initial implementation.

---

# 9. Prevent Mobile Interference

## Goal

Avoid overlap with:

* Mobile controls
* Touch areas
* Small screens

---

## Add Mobile Media Query

Recommended:

```css
@media (max-width: 768px) {
  #donateButton {
    left: 8px;
    top: auto;
    bottom: 20px;
    transform: none;
  }
}
```

Benefits:

* Avoids central obstruction on mobile.
* Keeps gameplay visible.
* Improves thumb accessibility.

---

# 10. Verify Modal Compatibility

The modal system should continue working because:

* The button ID remains unchanged.
* Existing JS listeners continue to target `#donateButton`. 

No JavaScript changes should be required unless positioning affects pointer events.

---

# 11. Validate Interaction Layers

## Test the Following

### Desktop

* Button remains fixed during scrolling.
* Hover animations still work.
* Canvas remains clickable.
* Modal opens correctly.

### Mobile

* Button does not overlap controls.
* Touch events function correctly.
* No accidental blocking of gameplay.

---

# 12. Recommended Final Architecture

## HTML

No changes required unless adding accessibility improvements.

---

## CSS Responsibility

### `layout.css`

Remove old grid placement.

---

### `buttons.css`

Add:

* fixed positioning
* side placement
* responsive behavior
* z-index management

This keeps the component styling centralized and aligned with your component-based CSS structure.

---

# 13. Suggested Future Improvements

## Possible Enhancements Later

### Slide-Out Animation

Hidden edge tab expanding on hover.

---

### Pulsing Glow

Subtle donation attention effect.

---

### Icon Integration

Example:

* heart icon
* crypto icon
* support icon

while maintaining your current sci-fi aesthetic.

---

### Collapsible Mobile Variant

Turn into:

* floating action button (FAB)
* mini icon button
* expandable support menu

on small screens.

---

# 14. Recommended Implementation Order

1. Remove grid positioning from `layout.css`.
2. Add fixed positioning rules.
3. Add z-index.
4. Test desktop behavior.
5. Add responsive mobile adjustments.
6. Verify modal interaction.
7. Add optional visual refinements.
