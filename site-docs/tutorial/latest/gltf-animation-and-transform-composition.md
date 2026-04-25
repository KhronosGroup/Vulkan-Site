# glTF Animation and Transform Composition

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/GLTF_Animation.html

## Table of Contents

- [What are glTF animations?](#_what_are_gltf_animations)
- [What_are_glTF_animations?](#_what_are_gltf_animations)
- [Understanding transform composition](#_understanding_transform_composition)
- [Understanding_transform_composition](#_understanding_transform_composition)
- [How it works in our engine](#_how_it_works_in_our_engine)
- [How_it_works_in_our_engine](#_how_it_works_in_our_engine)
- [1. Loading: Extract base transforms and animation data](#_1_loading_extract_base_transforms_and_animation_data)
- [1._Loading:_Extract_base_transforms_and_animation_data](#_1_loading_extract_base_transforms_and_animation_data)
- [2. Scene setup: Create entities and apply base transforms](#_2_scene_setup_create_entities_and_apply_base_transforms)
- [2._Scene_setup:_Create_entities_and_apply_base_transforms](#_2_scene_setup_create_entities_and_apply_base_transforms)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)
- [3. Playback: Compose animation with base transforms](#_3_playback_compose_animation_with_base_transforms)
- [3._Playback:_Compose_animation_with_base_transforms](#_3_playback_compose_animation_with_base_transforms)
- [Transform composition rules](#_transform_composition_rules)
- [Transform_composition_rules](#_transform_composition_rules)
- [Handling multiple instances](#_handling_multiple_instances)
- [Handling_multiple_instances](#_handling_multiple_instances)
- [Keyframe interpolation](#_keyframe_interpolation)
- [Performance considerations](#_performance_considerations)
- [Alternatives and extensions](#_alternatives_and_extensions)
- [Alternatives_and_extensions](#_alternatives_and_extensions)
- [What to read next](#_what_to_read_next_2)
- [What_to_read_next](#_what_to_read_next_2)

## Content

Animations bring life to 3D scenes — spinning ceiling fans, rotating gears, walking characters. This page explains how this engine loads and plays animations from glTF files, with a strong focus on **transform composition** (the thing that keeps objects animating in place instead of “drifting away”).

glTF (GL Transmission Format) is a standard for 3D assets that includes support for skeletal and node-based animations. Animations in glTF consist of:

* 
**Channels**: Define which node property to animate (translation, rotation, or scale)

* 
**Samplers**: Provide keyframe data and interpolation methods (step, linear, or cubic spline)

* 
**Timeline**: Time values mapping to output values for smooth playback

When you export an animated model from Blender, Maya, or other 3D tools, the animation data captures how nodes move over time **relative to their initial transforms**. This is crucial: animations describe **deltas** (changes), not absolute world positions.

Transform composition is the foundation of how animations work in 3D engines. Understanding this concept is essential for implementing any animation system.

**The core principle**: Animation data in GLTF describes **changes** (deltas), not absolute positions. When an artist animates a ceiling fan spinning in Blender, they’re defining how much it rotates over time, not where it should be in world space.

Consider a ceiling fan at position (10, 5, 8) with an animation that rotates it. The animation keyframes might specify:
* Translation: (0, 0, 0) — no movement
* Rotation: 0° → 360° around the Y axis — spinning
* Scale: (1, 1, 1) — no scaling

To display this correctly, we must **compose** the animation delta with the object’s base transform:

* 
**Base transform**: The object’s initial position/rotation/scale from the scene hierarchy

* 
**Animation transform**: The time-varying delta from the keyframes

* 
**Final transform**: Base composed with Animation

The composition rules are:
* Translation: `final = base + animDelta` (addition)
* Rotation: `final = base * animDelta` (quaternion multiplication)
* Scale: `final = base * animDelta` (component-wise multiplication)

With proper composition, our ceiling fan remains at (10, 5, 8) and spins in place.

Our animation system has three key components:

When loading a glTF file (`model_loader.cpp`), we extract:

* 
**Node transforms**: Each GLTF node has a local transform matrix stored in `animatedNodeTransforms` map

* 
**Animation data**: Channels, samplers, and keyframes stored in `Animation` objects

* 
**Node-to-mesh mapping**: Links node indices to mesh indices for entity matching

// In model_loader.cpp (conceptual)
std::unordered_map animatedNodeTransforms;  // nodeIndex -> base transform
std::unordered_map animatedNodeMeshes;            // nodeIndex -> meshIndex
std::vector animations;                          // animation clips

In `scene_loading.cpp`, for each animated node:

* 
**Create separate entities**: If multiple nodes share the same mesh (like two ceiling fans), create individual entities so each can animate independently

* 
**Apply base transforms**: Decompose the node’s transform matrix into position/rotation/scale and set the entity’s TransformComponent

* 
**Build nodeToEntity map**: Links GLTF node indices to entity pointers for animation targeting

// For each animated node
glm::mat4 nodeTransform = animatedNodeTransforms[nodeIndex];
glm::vec3 position, scale;
glm::quat rotation;
glm::decompose(nodeTransform, scale, rotation, position, ...);

transform->SetPosition(position);      // Base position (e.g., ceiling)
transform->SetRotation(eulerAngles(rotation));
transform->SetScale(scale);

**Critical insight**: animated nodes that share geometry must have separate entities. GPU instancing (one entity, multiple transforms) doesn’t work for individual animation control.

If you want to follow the data end-to-end:

* 
glTF parsing (nodes, animations, samplers):

`model_loader.cpp`

* 
`model_loader.h`

Scene/entity creation and node→entity mapping:

* 
`scene_loading.cpp`

Animation playback and transform composition:

* 
`animation_component.cpp`

* 
`animation_component.h`

Transform storage and composition helpers:

* 
`transform_component.cpp`

* 
`transform_component.h`

If you want to grow the animation system:

* 
Support animation blending (cross-fade between clips).

* 
Add skeletal skinning (vertex blending) if you want character animation.

* 
Add an animation debug UI that shows the active clip/time per entity (development-only).

* 
Add “bake transforms” options (useful for static meshes that only need a single animated pose).

* 
`Synchronization_and_Streaming.adoc` (animation + streaming can interact in large scenes)

* 
`Rendering_Pipeline_Overview.adoc`

* 
`Push_Constants_Per_Object.adoc`

In `AnimationComponent::Update()`:

**Capture base transforms on first frame**: Store each entity’s initial position/rotation/scale when animation starts

**Sample keyframes**: Interpolate animation data at current time

**Compose transforms**: Add/multiply animation deltas with base transforms

**Apply to entity**: Update the TransformComponent with the composed result

// Animation update logic
glm::vec3 basePos = basePositions[nodeIndex];           // e.g., (10, 5, 8)
glm::vec3 animTranslation = SampleVec3(sampler, time);  // e.g., (0, 0, 0)
transform->SetPosition(basePos + animTranslation);      // Result: (10, 5, 8)

glm::quat baseRot = baseRotations[nodeIndex];           // e.g., identity quaternion
glm::quat animRotation = SampleQuat(sampler, time);     // e.g., 45° around Y
glm::quat finalRotation = baseRot * animRotation;       // Compose using quaternion multiplication
transform->SetRotation(glm::eulerAngles(finalRotation)); // Convert to Euler for transform

Different transform properties compose differently:

**Translation**: Additive

finalPosition = basePosition + animationTranslation

Addition works naturally for positions in 3D space.

**Rotation**: Quaternion multiplication

finalRotation = baseRotation * animationRotation  // quaternion math
finalEuler = eulerAngles(finalRotation)            // convert for display

Rotations must be composed using quaternion multiplication to avoid gimbal lock and correctly preserve rotation order. Always work in quaternion space during composition, then convert to Euler angles only when setting the transform.

**Scale**: Multiplicative

finalScale = baseScale * animationScale  // component-wise

Animation scale of (1, 1, 1) means "no change", (2, 1, 1) means "double X axis".

When two GLTF nodes reference the same mesh (e.g., two identical ceiling fans), you need separate entities for independent animation.

**Why separate entities?**
* GPU instancing is designed for many identical, non-animated objects (trees, rocks, grass)
* Instance transforms are set once per frame; you cannot animate each instance independently
* Animation requires per-entity TransformComponents that update every frame

**Implementation approach**: Create separate entities

// First node reuses existing entity
nodeEntity = geometryEntities[meshIndex];

// Second node creates new entity with cloned geometry
nodeEntity = engine->CreateEntity("AnimNode_5");
mesh->SetVertices(sourceMesh->vertices);  // Clone mesh data
mesh->SetIndices(sourceMesh->indices);

Each entity gets its own TransformComponent and can animate independently.

GLTF supports three interpolation modes:

**Step**: Jump instantly to next keyframe (no smoothing)

return keyframe0.value;  // Robotic, retro feel

**Linear**: Smooth linear blend between keyframes

return glm::mix(v0, v1, t);  // Most common, looks natural

**Cubic Spline**: Smooth curves using tangents

// Hermite spline using in-tangent, value, out-tangent
// For production: implement full cubic interpolation for smoother motion

For rotations, use spherical linear interpolation (slerp) instead of mix:

return glm::slerp(q0, q1, t);  // Avoids gimbal lock

**Animation Update Cost**: O(channels × entities)
* For 10 animated objects with 3 channels each (translation, rotation, scale): ~30 transform updates per frame
* This is cheap; transform math is fast

**Memory**: Each animated entity needs:
* Cloned mesh data (vertices, indices): ~100KB for a ceiling fan
* Transform storage: 3×vec3 = 36 bytes per node

**Optimization tip**: If you have hundreds of identical animated objects (e.g., grass blades), consider GPU-side animation with compute shaders instead of per-entity CPU updates.

**Skeletal animation (skinning)**

* 
For characters with bones/joints

* 
Requires vertex skinning (blend multiple bone transforms per vertex)

* 
More complex than node animation but enables realistic deformation

**Morph targets (blend shapes)**

* 
For facial animation or smooth shape transitions

* 
GLTF supports weights channel for morph targets

* 
Extends beyond node transforms to deform mesh vertices

**Procedural animation**

* 
Generate animation data at runtime (e.g., wind sway, noise-based motion)

* 
More flexible but requires custom authoring

If you want to dive deeper:

* 
**Transform Component**: See `transform_component.h` for how we store and compute model matrices

* 
**GLTF Specification**: [GLTF Specification about animation](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#animations)

* 
**Synchronization**: How animation updates interact with render frame timing

The key takeaway: **Always compose animation transforms with base transforms**. This fundamental principle is what makes objects animate in their correct world positions while the animation data itself describes relative changes. Understanding this composition is essential for any animation system.

Now you have the foundation to implement GLTF animations in your own projects. Happy animating! 🚁
