# Asymmetric Frustums for Canted Displays

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/11_Canted_Displays/02_non_parallel_projections.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Tangent Frustum: Mapping Angles to Pixels](#_the_tangent_frustum_mapping_angles_to_pixels)
- [The_Tangent_Frustum:_Mapping_Angles_to_Pixels](#_the_tangent_frustum_mapping_angles_to_pixels)
- [Building the Matrix](#_building_the_matrix)
- [Building_the_Matrix](#_building_the_matrix)
- [Canted Displays: The Rotation Problem](#_canted_displays_the_rotation_problem)
- [Canted_Displays:_The_Rotation_Problem](#_canted_displays_the_rotation_problem)
- [Advanced: Perspective-Correct Interpolation and Dynamic FOV](#_advanced_perspective_correct_interpolation_and_dynamic_fov)
- [Advanced:_Perspective-Correct_Interpolation_and_Dynamic_FOV](#_advanced_perspective_correct_interpolation_and_dynamic_fov)

## Content

When you query `xrLocateViews`, OpenXR returns a `pose` and a `fov` for each eye. On headsets with canted (rotated) lenses, these values are unique per eye and require specialized matrix construction.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Correctly calculating projection matrices from runtime-provided FOV tangents is a mandatory step for supporting modern wide-FOV headsets. You must use the runtime’s view metadata to ensure your Vulkan renders align with the physical hardware.

To understand why OpenXR uses tangents, we must look at how a camera sees the world. GPUs work with **Clip Space**—a box from -1 to 1. To get from a 3D world to a 2D box, we need the tangents of the FOV angles.

The `fov` provided by `xrLocateViews` is expressed as four tangents: `angleLeft`, `angleRight`, `angleUp`, and `angleDown`.

* 
**Symmetric (Desktop)**: Left = -Right, Up = -Down. The optical center is in the middle.

* 
**Asymmetric (XR)**: Left != -Right. The optical center is shifted to align with the physical lens.

The runtime calculates these tangents based on the precise factory calibration of the headset, accounting for display panel tilt and lens-eye distance.

To build a proper 4x4 projection matrix from these tangents, we use the following logic:

// Constructing an asymmetric projection matrix from OpenXR FOV tangents
glm::mat4 createProjectionMatrix(const XrFovf& fov, float zNear, float zFar) {
    const float tanLeft = std::tan(fov.angleLeft);
    const float tanRight = std::tan(fov.angleRight);
    const float tanUp = std::tan(fov.angleUp);
    const float tanDown = std::tan(fov.angleDown);

    const float tanWidth = tanRight - tanLeft;
    const float tanHeight = tanUp - tanDown;

    glm::mat4 projection(0.0f);
    projection[0][0] = 2.0f / tanWidth;
    projection[1][1] = 2.0f / tanHeight;

    // The "Shift" components align the frustum with the lens optical center
    projection[2][0] = (tanRight + tanLeft) / tanWidth;
    projection[2][1] = (tanUp + tanDown) / tanHeight;

    projection[2][2] = zFar / (zNear - zFar);
    projection[2][3] = -1.0f;
    projection[3][2] = -(zFar * zNear) / (zFar - zNear);
    return projection;
}

On headsets like the Valve Index, the display panels are rotated outward (canted). This means your **View Matrices** are also different for each eye.

When you use **Multiview**, you must push unique projection and view matrices to your shaders. If you try to use a single "stereo" matrix with a fixed offset, the world will appear warped because the GPU is drawing a rectilinear world for a non-rectilinear display.

Vulkan allows for geometric precision that raw OpenXR data does not manage:

* 
**Perspective-Correct Interpolation**: Using Vulkan’s **Dynamic State** and **Push Constants**, you can pass eye-specific clip-plane data to your shaders, ensuring lighting and shadow calculations remain stable even on headsets with extreme panel rotation.

* 
**Viewport Swizzling**: You can use Vulkan’s **Viewport Swizzling** to dynamically adjust the rendered area for each eye based on real-time optical changes, providing a more responsive experience than the fixed OpenXR view configuration.

|  | For more information on asymmetric projections, check out the official [OpenXR Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#projection-matrices), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_viewport_swizzling.html)
