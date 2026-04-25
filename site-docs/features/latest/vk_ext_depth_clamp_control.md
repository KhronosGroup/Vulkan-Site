# VK_EXT_depth_clamp_control

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_depth_clamp_control.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Issues](#_issues)
- [4.1. Should the depth clamp range be a per-viewport parameter?](#_should_the_depth_clamp_range_be_a_per_viewport_parameter)
- [4.1._Should_the_depth_clamp_range_be_a_per-viewport_parameter?](#_should_the_depth_clamp_range_be_a_per_viewport_parameter)
- [4.2. Should this pipeline state be dynamic?](#_should_this_pipeline_state_be_dynamic)
- [4.2._Should_this_pipeline_state_be_dynamic?](#_should_this_pipeline_state_be_dynamic)
- [4.3. Can the depth clamp range be ignored when depth clamping is disabled?](#_can_the_depth_clamp_range_be_ignored_when_depth_clamping_is_disabled)
- [4.3._Can_the_depth_clamp_range_be_ignored_when_depth_clamping_is_disabled?](#_can_the_depth_clamp_range_be_ignored_when_depth_clamping_is_disabled)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Issues](#_issues)

[4.1. Should the depth clamp range be a per-viewport parameter?](#_should_the_depth_clamp_range_be_a_per_viewport_parameter)
[4.2. Should this pipeline state be dynamic?](#_should_this_pipeline_state_be_dynamic)
[4.3. Can the depth clamp range be ignored when depth clamping is disabled?](#_can_the_depth_clamp_range_be_ignored_when_depth_clamping_is_disabled)

This document details API design ideas for the `VK_EXT_depth_clamp_control`
extension, which provides functionality for finer control over the behavior
of depth clamping when rendering.

API layering efforts regularly need to emulate integer depth formats using
floating-point formats such as `VK_FORMAT_D32_SFLOAT_S8_UINT`.
This works well when emulating normalized fixed-point depth format such as
`VK_FORMAT_D24_UNORM_S8_UINT`, however this creates issues when the integer
format is not normalized.

In a hypothetical `VK_FORMAT_D24_UINT_S8_UINT` format the depth values are
truncated rather than normalized.
Attempting to emulate this format by normalizing the depth values using a
2^n-1 divisor results in floating-point rounding errors compared to a true
unnormalized format.

Instead of normalizing the depth values the
`VK_EXT_unrestricted_depth_range` extension can be used in combination with
a `VK_FORMAT_D32_SFLOAT_S8_UINT` depth buffer to allow for a [0, 2^n-1]
depth range without requiring any normalization.
The lack of truncation does not present an issue as the truncation can
simply be applied when reading back depth values.

The unrestricted depth range does present a new issue, because a depth clamp
on the final depth value as specified in `VK_EXT_depth_clamp_zero_one` is
still required to prevent depth values from exceeding the 24-bit integer
range of the emulated depth buffer.
This means a clamp of [0, 2^n-1] needs to be applied on the final depth
value independently of the viewport depth range.

Normalize depth values using a power-of-two divisor to avoid rounding
errors

* 
The application could attempt to normalize depth values using 2^n instead
of 2^n-1.
While this does solve the rounding error without the need for
`VK_EXT_unrestricted_depth_range`, this does not solve the depth clamping
issue as a clamp of [0, 2^n-1 / 2^n] would now be required instead to
ensure the final depth value does not exceed the 24-bit integer range.

Solve from the application side with shader-side clamping using
`gl_FragDepth`

* 
Another option from the application side is to clamp `gl_FragDepth`
manually in the shader.
This is problematic as it can lead to reduced performance as this
disables early-z optimizations.
It is also breaks compatibility if the application force-enabled early-z.

Define a new fixed-point depth format `VK_FORMAT_D24_UINT_S8_UINT` that
is not normalized.

* 
This is problematic because the normalization as part of
`VK_FORMAT_D24_UNORM_S8_UINT` is often fixed in hardware with no ability
to turn it off.
It is also unlikely such a format would ever be natively supported in
hardware.

Add a method of specifying the depth clamp independently

* 
A Vulkan extension could be made to provide functionality to specify the
depth clamp range separately from the viewport transform depth range.

Add a new enum, `VkDepthClampModeEXT` that allows switching between the
default per-viewport depth clamp range and a single user-defined range for
all viewports.

Add a new function, `vkCmdSetDepthClampRangeEXT` that uses
`VkDepthClampModeEXT` and `VkDepthClampRangeEXT` to handle dynamically
changing the depth clamp mode and range for all viewports.

Add a new structure, `VkPipelineViewportDepthClampControlCreateInfoEXT`,
that can be added to the `pNext` chain of a pipeline’s
`VkPipelineViewportStateCreateInfo` that allows setting the depth clamp mode
and range of all viewports in the pipeline.

It will also have a feature flag to allow implementations to indicate
whether they support setting the depth clamp mode to
VK_DEPTH_CLAMP_MODE_USER_DEFINED_EXT.

typedef enum VkDepthClampModeEXT {
    VK_DEPTH_CLAMP_MODE_VIEWPORT_RANGE_EXT = 0,
    VK_DEPTH_CLAMP_MODE_USER_DEFINED_RANGE_EXT = 1,
    VK_DEPTH_CLAMP_MODE_MAX_ENUM_EXT = 0x7FFFFFFF
} VkDepthClampModeEXT;

typedef struct VkDepthClampRangeEXT {
    float    minDepthClamp;
    float    maxDepthClamp;
} VkDepthClampRangeEXT;

VKAPI_ATTR void VKAPI_CALL vkCmdSetDepthClampRangeEXT(
    VkCommandBuffer                             commandBuffer,
    VkDepthClampModeEXT                         depthClampMode,
    const VkDepthClampRangeEXT*                 pDepthClampRange);

// Part of the pNext chain of a VkPipelineViewportStateCreateInfo.
typedef struct VkPipelineViewportDepthClampControlCreateInfoEXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkDepthClampModeEXT            depthClampMode;
    const VkDepthClampRangeEXT*    pDepthClampRange;
} VkPipelineViewportDepthClampControlCreateInfoEXT;

No.
Because the depth clamp range was previously defined to be equal to the
viewport depth range, conformant runtimes are already handling the depth
clamp range as a per-viewport parameter.
However since a per-viewport parameter is not necessary to address the
original issue and because of complexities from interactions with
multi-viewport support, this is left to a future extensions if a use case
arises.

Yes.
Since the viewport depth range can already be a dynamic state conformant
runtimes are already able to handle the depth clamp range as a dynamic
state.

Yes.
This extension overrides the clamping range used only when depth clamping is
enabled.
The alternative would be highly unintuitive.
As a consequence the
[VK_EXT_depth_clamp_control](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_depth_clamp_control)
extension is required if depth clipping is desired in combination with this
extension.
