# vkCmdBindShadersEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindShadersEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindShadersEXT - Bind shader objects to a command buffer

Once shader objects have been created, they **can** be bound to the command
buffer using the command:

// Provided by VK_EXT_shader_object
void vkCmdBindShadersEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    stageCount,
    const VkShaderStageFlagBits*                pStages,
    const VkShaderEXT*                          pShaders);

* 
`commandBuffer` is the command buffer that the shader object will be
bound to.

* 
`stageCount` is the length of the `pStages` and `pShaders`
arrays.

* 
`pStages` is a pointer to an array of [VkShaderStageFlagBits](VkShaderStageFlagBits.html)
values specifying one stage per array index that is affected by the
corresponding value in the `pShaders` array.

* 
`pShaders` is a pointer to an array of `VkShaderEXT` handles
and/or [VK_NULL_HANDLE](VK_NULL_HANDLE.html) values describing the shader binding
operations to be performed on each stage in `pStages`.

When binding linked shaders, an application **may** bind them in any
combination of one or more calls to `vkCmdBindShadersEXT` (i.e., shaders
that were created linked together do not need to be bound in the same
`vkCmdBindShadersEXT` call).

Any shader object bound to a particular stage **may** be unbound by setting its
value in `pShaders` to [VK_NULL_HANDLE](VK_NULL_HANDLE.html).
If `pShaders` is `NULL`, `vkCmdBindShadersEXT` behaves as if
`pShaders` was an array of `stageCount` [VK_NULL_HANDLE](VK_NULL_HANDLE.html) values
(i.e., any shaders bound to the stages specified in `pStages` are
unbound).

Valid Usage

* 
[](#VUID-vkCmdBindShadersEXT-None-08462) VUID-vkCmdBindShadersEXT-None-08462

The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature **must** be
enabled

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08463) VUID-vkCmdBindShadersEXT-pStages-08463

Every element of `pStages` **must** be unique

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08464) VUID-vkCmdBindShadersEXT-pStages-08464

`pStages` **must** not contain [VK_SHADER_STAGE_ALL_GRAPHICS](VkShaderStageFlagBits.html) or
[VK_SHADER_STAGE_ALL](VkShaderStageFlagBits.html)

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08465) VUID-vkCmdBindShadersEXT-pStages-08465

`pStages` **must** not contain [VK_SHADER_STAGE_RAYGEN_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_MISS_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](VkShaderStageFlagBits.html)

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08467) VUID-vkCmdBindShadersEXT-pStages-08467

`pStages` **must** not contain
[VK_SHADER_STAGE_SUBPASS_SHADING_BIT_HUAWEI](VkShaderStageFlagBits.html)

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08468) VUID-vkCmdBindShadersEXT-pStages-08468

`pStages` **must** not contain
[VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI](VkShaderStageFlagBits.html)

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08469) VUID-vkCmdBindShadersEXT-pShaders-08469

For each element of `pStages`, if `pShaders` is not `NULL`, and
the element of the `pShaders` array with the same index is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have been created with a `stage`
equal to the corresponding element of `pStages`

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08470) VUID-vkCmdBindShadersEXT-pShaders-08470

If `pStages` contains both [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html) and
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html), and `pShaders` is not `NULL`, and
the same index in `pShaders` as [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html)
in `pStages` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the same index in
`pShaders` as [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html) in `pStages`
**must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08471) VUID-vkCmdBindShadersEXT-pShaders-08471

If `pStages` contains both [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html) and
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html), and `pShaders` is not `NULL`, and
the same index in `pShaders` as [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)
in `pStages` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the same index in
`pShaders` as [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html) in `pStages`
**must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08476) VUID-vkCmdBindShadersEXT-pShaders-08476

If `pStages` contains [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html), the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support compute operations

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08477) VUID-vkCmdBindShadersEXT-pShaders-08477

If `pStages` contains [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html), the `VkCommandPool` that
`commandBuffer` was allocated from **must** support graphics operations

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08478) VUID-vkCmdBindShadersEXT-pShaders-08478

If `pStages` contains [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html) or
[VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html), the `VkCommandPool` that
`commandBuffer` was allocated from **must** support graphics operations

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindShadersEXT-commandBuffer-parameter) VUID-vkCmdBindShadersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindShadersEXT-pStages-parameter) VUID-vkCmdBindShadersEXT-pStages-parameter

 `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-parameter) VUID-vkCmdBindShadersEXT-pShaders-parameter

 If `pShaders` is not `NULL`, `pShaders` **must** be a valid pointer to an array of `stageCount` valid or [VK_NULL_HANDLE](VK_NULL_HANDLE.html) [VkShaderEXT](VkShaderEXT.html) handles

* 
[](#VUID-vkCmdBindShadersEXT-commandBuffer-recording) VUID-vkCmdBindShadersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindShadersEXT-commandBuffer-cmdpool) VUID-vkCmdBindShadersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindShadersEXT-videocoding) VUID-vkCmdBindShadersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindShadersEXT-stageCount-arraylength) VUID-vkCmdBindShadersEXT-stageCount-arraylength

 `stageCount` **must** be greater than `0`

* 
[](#VUID-vkCmdBindShadersEXT-commonparent) VUID-vkCmdBindShadersEXT-commonparent

 Both of `commandBuffer`, and the elements of `pShaders` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindShadersEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html), [VkShaderEXT](VkShaderEXT.html), [VkShaderStageFlagBits](VkShaderStageFlagBits.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCmdBindShadersEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
