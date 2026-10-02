# Debugging & Visual Auditing

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/Debugging_Visual_Auditing/01_introduction.html

## Table of Contents

- [When the Asset Is Right and the Engine Is Wrong](#_when_the_asset_is_right_and_the_engine_is_wrong)
- [When_the_Asset_Is_Right_and_the_Engine_Is_Wrong](#_when_the_asset_is_right_and_the_engine_is_wrong)

## Content

The previous chapter established how to ensure that a glTF asset is correct before it reaches the engine. This chapter picks up from the moment the asset passes validation and the reference viewer shows the correct result—but your engine still renders something wrong.

At this stage, the problem is in the engine code. The question is which part of the code, and that is where visual debugging tools become essential. The character pipeline we have built over this series has several independently complex stages: the scene graph transform hierarchy, the compute skinning pass, the physics simulation, the procedural animation layers. A visual artifact could originate in any of them. Without tooling that makes each stage’s state visible, you are reduced to blind guessing.

The techniques in this chapter are about making invisible state visible. The physics simulation has a complete geometric representation of every bone in the character’s body—but you cannot see it, because the physics engine draws nothing by default. The skinning shader computes a per-vertex output buffer that contains the final animated positions—but you cannot inspect it in a GPU debugger unless you know what format to look for. The bone influence weights that drive vertex deformation are stored as four float values per vertex—but you cannot tell from looking at the rendered mesh whether they are correct.

We will implement tools to address each of these blind spots. Debug drawers render wireframe geometry that overlays the character with a visualization of the skeleton, collision shapes, and physics constraints. Skinning heatmaps render the mesh with vertex colors derived from bone influence weights, making incorrect or extreme weight painting immediately visible. RenderDoc capture and analysis lets you freeze a frame and examine the post-skinning output buffer directly, verifying vertex positions and normals at the GPU level.

[Previous: Tooling Conclusion](../Tooling_Production_Pipeline/05_conclusion.html) | [Next: Debug Drawers](02_debug_drawers.html)
