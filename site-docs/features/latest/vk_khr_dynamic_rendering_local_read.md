# VK_KHR_dynamic_rendering_local_read

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_dynamic_rendering_local_read.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Features](#_features)
- [3.2. Dynamic Rendering Self-Dependencies](#_dynamic_rendering_self_dependencies)
- [3.2._Dynamic_Rendering_Self-Dependencies](#_dynamic_rendering_self_dependencies)
- [3.3. Color Attachment Remapping](#_color_attachment_remapping)
- [3.3._Color_Attachment_Remapping](#_color_attachment_remapping)
- [3.4. Input Attachment Mapping](#_input_attachment_mapping)
- [3.4._Input_Attachment_Mapping](#_input_attachment_mapping)
- [3.5. Read-only Input Attachments](#_read_only_input_attachments)
- [3.5._Read-only_Input_Attachments](#_read_only_input_attachments)
- [3.6. Interactions with VK_EXT_shader_object](#_interactions_with_vk_ext_shader_object)
- [3.6._Interactions_with_VK_EXT_shader_object](#_interactions_with_vk_ext_shader_object)
- [3.7. Interactions with VK_EXT_rasterization_order_attachment_access](#_interactions_with_vk_ext_rasterization_order_attachment_access)
- [3.7._Interactions_with_VK_EXT_rasterization_order_attachment_access](#_interactions_with_vk_ext_rasterization_order_attachment_access)
- [3.8. GLSL Changes](#_glsl_changes)
- [3.8._GLSL_Changes](#_glsl_changes)
- [3.9. HLSL Changes](#_hlsl_changes)
- [3.9._HLSL_Changes](#_hlsl_changes)
- [4. Example: Porting](#_example_porting)
- [4._Example:_Porting](#_example_porting)
- [4.1. Multiple Subpasses](#_multiple_subpasses)
- [4.1._Multiple_Subpasses](#_multiple_subpasses)
- [4.2. Dynamic Rendering Dependencies](#_dynamic_rendering_dependencies)
- [4.2._Dynamic_Rendering_Dependencies](#_dynamic_rendering_dependencies)
- [5. Issues](#_issues)
- [5.1. Why is color attachment location reordering included?](#_why_is_color_attachment_location_reordering_included)
- [5.1._Why_is_color_attachment_location_reordering_included?](#_why_is_color_attachment_location_reordering_included)
- [5.2. Why are some of the functions of multiple subpasses not exposed?](#_why_are_some_of_the_functions_of_multiple_subpasses_not_exposed)
- [5.2._Why_are_some_of_the_functions_of_multiple_subpasses_not_exposed?](#_why_are_some_of_the_functions_of_multiple_subpasses_not_exposed)
- [5.3. Should input attachment descriptors be required?](#_should_input_attachment_descriptors_be_required)
- [5.3._Should_input_attachment_descriptors_be_required?](#_should_input_attachment_descriptors_be_required)
- [5.4. Should this extension include the ability for fragment shaders to reinterpret the format of a color/input attachment during rendering?](#_should_this_extension_include_the_ability_for_fragment_shaders_to_reinterpret_the_format_of_a_colorinput_attachment_during_rendering)
- [5.4._Should_this_extension_include_the_ability_for_fragment_shaders_to_reinterpret_the_format_of_a_color/input_attachment_during_rendering?](#_should_this_extension_include_the_ability_for_fragment_shaders_to_reinterpret_the_format_of_a_colorinput_attachment_during_rendering)
- [5.5. Should this extension advertise local reads between fragments in the same draw call?](#_should_this_extension_advertise_local_reads_between_fragments_in_the_same_draw_call)
- [5.5._Should_this_extension_advertise_local_reads_between_fragments_in_the_same_draw_call?](#_should_this_extension_advertise_local_reads_between_fragments_in_the_same_draw_call)
- [5.6. Should this extension allow applications to access local data from resources other than attachments?](#_should_this_extension_allow_applications_to_access_local_data_from_resources_other_than_attachments)
- [5.6._Should_this_extension_allow_applications_to_access_local_data_from_resources_other_than_attachments?](#_should_this_extension_allow_applications_to_access_local_data_from_resources_other_than_attachments)
- [5.7. Should read-only input attachments be specified in vkCmdBeginRendering to enable pre-fetch in tilers?](#_should_read_only_input_attachments_be_specified_in_vkcmdbeginrendering_to_enable_pre_fetch_in_tilers)
- [5.7._Should_read-only_input_attachments_be_specified_in_vkCmdBeginRendering_to_enable_pre-fetch_in_tilers?](#_should_read_only_input_attachments_be_specified_in_vkcmdbeginrendering_to_enable_pre_fetch_in_tilers)
- [5.8. Why are color attachment location and input attachment index remappings provided both statically and dynamically?](#_why_are_color_attachment_location_and_input_attachment_index_remappings_provided_both_statically_and_dynamically)
- [5.8._Why_are_color_attachment_location_and_input_attachment_index_remappings_provided_both_statically_and_dynamically?](#_why_are_color_attachment_location_and_input_attachment_index_remappings_provided_both_statically_and_dynamically)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Features](#_features)
[3.2. Dynamic Rendering Self-Dependencies](#_dynamic_rendering_self_dependencies)
[3.3. Color Attachment Remapping](#_color_attachment_remapping)
[3.4. Input Attachment Mapping](#_input_attachment_mapping)
[3.5. Read-only Input Attachments](#_read_only_input_attachments)
[3.6. Interactions with VK_EXT_shader_object](#_interactions_with_vk_ext_shader_object)
[3.7. Interactions with VK_EXT_rasterization_order_attachment_access](#_interactions_with_vk_ext_rasterization_order_attachment_access)
[3.8. GLSL Changes](#_glsl_changes)
[3.9. HLSL Changes](#_hlsl_changes)

[4. Example: Porting](#_example_porting)

[4.1. Multiple Subpasses](#_multiple_subpasses)
[4.2. Dynamic Rendering Dependencies](#_dynamic_rendering_dependencies)

[5. Issues](#_issues)

[5.1. Why is color attachment location reordering included?](#_why_is_color_attachment_location_reordering_included)
[5.2. Why are some of the functions of multiple subpasses not exposed?](#_why_are_some_of_the_functions_of_multiple_subpasses_not_exposed)
[5.3. Should input attachment descriptors be required?](#_should_input_attachment_descriptors_be_required)
[5.4. Should this extension include the ability for fragment shaders to reinterpret the format of a color/input attachment during rendering?](#_should_this_extension_include_the_ability_for_fragment_shaders_to_reinterpret_the_format_of_a_colorinput_attachment_during_rendering)
[5.5. Should this extension advertise local reads between fragments in the same draw call?](#_should_this_extension_advertise_local_reads_between_fragments_in_the_same_draw_call)
[5.6. Should this extension allow applications to access local data from resources other than attachments?](#_should_this_extension_allow_applications_to_access_local_data_from_resources_other_than_attachments)
[5.7. Should read-only input attachments be specified in `vkCmdBeginRendering` to enable pre-fetch in tilers?](#_should_read_only_input_attachments_be_specified_in_vkcmdbeginrendering_to_enable_pre_fetch_in_tilers)
[5.8. Why are color attachment location and input attachment index remappings provided both statically and dynamically?](#_why_are_color_attachment_location_and_input_attachment_index_remappings_provided_both_statically_and_dynamically)

This extension enables reads from attachments and resources written by previous fragment shaders within a dynamic render pass.

[VK_KHR_dynamic_rendering](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_dynamic_rendering.adoc) enabled a much more straightforward method for applications to setup rendering code without the need for a large dedicated object up front.
That extension enabled a number of applications that do not use multiple subpasses to use a more streamlined method for getting rendering started.

However, applications using multiple subpasses or wanting to do things like order independent transparency or simple deferred rendering cannot make use of [VK_KHR_dynamic_rendering](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_dynamic_rendering.adoc), as there is no path for subpass dependencies to be expressed without breaking rendering across multiple separate render passes.

Adding a method for applications using these techniques to express these in dynamic rendering would enable more developers to take advantage of this functionality without the complexity of setting up render pass objects.

The solution to this problem has to involve some way of allowing the addition of local attachment reads to dynamic rendering, and the following additional constraints also exist:

* 
The solution has to remain easy to use in keeping with dynamic rendering’s core goals.

* 
The solution should require minimal deviation from multi-pass code using render pass objects to enable easier porting.

* 
The solution should be implementable efficiently across all platforms, but allow space for vendor fast paths.

The following feature advertises the full functionality of this extension:

typedef struct VkPhysicalDeviceDynamicRenderingLocalReadFeaturesKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    VkBool32                        dynamicRenderingLocalRead;
} VkPhysicalDeviceDynamicRenderingLocalReadFeaturesKHR;

If the `dynamicRenderingLocalReads` feature is enabled, pipeline barriers are now allowed within dynamic rendering if they include `VK_DEPENDENCY_BY_REGION_BIT`, and source and destination stages are all framebuffer-space stages.
When such a pipeline barrier is provided, any resources specified (or all if a memory barrier is used) can be read by a subsequent fragment shader in the same render pass if they were written to by any overlapping fragment location (x,y,layer/view,sample).
These pipeline barriers cannot perform layout transitions or queue family transfers.
Reading data outside of values written by a previous fragment shader has undefined behavior.

|  | When writing to storage resources the actual location in the resource is not relevant - only the fragment locations accessing the values.
| --- | --- |
For instance, if a fragment at position (x=5,y=5) wrote to a storage image at position (x=6,y=6) and (x=21,y=700), then a subsequent fragment at (x=5,y=5) would be able to read (x=6,y=6) and (x=21,y=700) from the same storage image with an appropriate barrier between the accesses.
In this same example, reading from (x=5,y=5) in the storage image would be a data race if any other fragment wrote to it.
This allows applications to associate arbitrary amounts of data with a given pixel, and extends to the use of buffers or device addresses as well. |

Images used for this purpose must be in either the `VK_IMAGE_LAYOUT_GENERAL` layout, or a new dedicated layout:

VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ_KHR = 1000232000;

This layout can be used for storage images, and render pass color, depth/stencil, and input attachments.
Writes to attachments can only be made visible in this way via input attachments, and writes via other resource types will not be made visible via input attachments.

|  | While the same layout can be used for storage images and all attachments, there is still no way to write through one type of resource and then read through another in the same render pass instance. |
| --- | --- |

In order to facilitate applications porting multi-pass rendering to dynamic rendering, the following functionality is added to allow remapping of color attachment locations during rendering:

typedef struct VkRenderingAttachmentLocationInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    const uint32_t                  colorAttachmentCount;
    const uint32_t*                 pColorAttachmentLocations;
} VkRenderingAttachmentLocationInfoKHR;

void vkCmdSetRenderingAttachmentLocationsKHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingAttachmentLocationInfoKHR* pLocationInfo);

As with render pass objects, this information must be provided both when creating a pipeline and during rendering, and must match between the two in order to be valid.

This information can be provided during pipeline creation by chaining `VkRenderingAttachmentLocationInfoKHR` to [VkGraphicsPipelineCreateInfo](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#VkGraphicsPipelineCreateInfo) when the fragment output state subset is required.
If this structure is not provided for pipeline creation, it is equivalent to setting the value of each element of `pColorAttachmentLocations` to the value of its index within the array, and `colorAttachmentCount` equal to the value of [VkPipelineRenderingCreateInfoKHR::colorAttachmentCount](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#VkPipelineRenderingCreateInfoKHR).

`vkCmdSetRenderingAttachmentLocationsKHR` must only be called within a dynamic render pass instance.
If this command is not called, the default state is that each element of `pColorAttachmentLocations` is equal to the value of its index within the array.

The index of each element of `pColorAttachmentLocations` corresponds to the same index of a color attachment in a dynamic render pass, and the value of that element becomes the location that refers to it, providing a way to remap color attachment locations.
This does not allow an application to wholesale swap out color attachments, but if an application can specify all color attachments that would be used during dynamic rendering as a superset, fragment shaders written for render pass objects can be reused without modification when porting to this extension, simply by remapping the attachments.
Values in `pColorAttachmentLocations` must each be unique.

|  | The color attachment remapping does not affect things like blend state or format mappings - these always correspond 1:1 with the render pass attachments.
| --- | --- |
This means when porting from render pass objects, care must be taken to ensure these are reordered correctly, where before the values mapped to the reordered elements in the subpass. |

When issuing a draw call, the location mapping must match between the bound graphics pipeline and the command buffer state set by `vkCmdSetRenderingAttachmentLocationsKHR`.

`VkRenderingAttachmentLocationInfoKHR` can also be chained to [VkCommandBufferInheritanceInfo](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceInfo) when using secondary command buffers, to specify the color attachment location mapping in the primary command buffer when [vkCmdExecuteCommands](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#vkCmdExecuteCommands) is called.
If `VkRenderingAttachmentLocationInfoKHR` is not provided in the inheritance info, it is equivalent to providing it with the value of each element of `pColorAttachmentLocations` set to the value of its index within the array, with the color attachment count equal to that specified by [VkCommandBufferInheritanceRenderingInfo::colorAttachmentCount](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceRenderingInfo).
This information must match between the inheritance info and the state when [vkCmdExecuteCommands](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#vkCmdExecuteCommands) is called if there is a currently active render pass instance.

|  | This functionality is provided primarily for porting existing content to the new API; new applications should maintain a consistent location for all attachments in their shaders during a render pass; this functionality can be considered immediately deprecated. |
| --- | --- |

While an attachment is mapped to `VK_ATTACHMENT_UNUSED` in command buffer state (either via `vkCmdSetRenderingAttachmentLocationsKHR` or inheritance state), it must not be cleared by [vkCmdClearAttachments](https://docs.vulkan.org/spec/latest/chapters/clears.html#vkCmdClearAttachments).
Some implementations will update the render pass attachment bindings when remapping occurs, leaving unmapped attachments unavailable to be written to via the path that [vkCmdClearAttachments](https://docs.vulkan.org/spec/latest/chapters/clears.html#vkCmdClearAttachments) would use.
This is in line with render pass objects, where applications would not be able to clear an attachment outside of the current subpass.

There are two ways to map input attachments to other attachments during dynamic rendering; the simplest is to rely on the `InputAttachmentIndex` qualifier matching the location of the corresponding color attachment, or being omitted for a depth/stencil attachment.
By default, a color attachment specified at index *i* in the API will be associated with an input attachment with `InputAttachmentIndex` equal to *i*.
This mapping is not affected by the mappings set by `VkRenderingAttachmentLocationInfoKHR`.
Any input attachment without an `InputAttachmentIndex` will be associated with the depth/stencil attachment.
For applications where writing new shaders is viable, this allows a simple mapping without API intervention.

For applications porting existing content from render pass objects where modifying shaders is not straightforward, functionality similar to `VkRenderingAttachmentLocationInfoKHR` is provided to allow remapping the input attachments to different attachments:

typedef struct VkRenderingInputAttachmentIndexInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    const uint32_t                  colorAttachmentCount;
    const uint32_t*                 pColorAttachmentInputIndices;
    uint32_t*                       pDepthInputAttachmentIndex;
    uint32_t*                       pStencilInputAttachmentIndex;
} VkRenderingInputAttachmentIndexInfoKHR;

void vkCmdSetRenderingInputAttachmentIndicesKHR(
    VkCommandBuffer                                 commandBuffer,
    const VkRenderingInputAttachmentIndexInfoKHR*   pInputAttachmentIndexInfo);

This information can be provided during pipeline creation by chaining `VkRenderingInputAttachmentIndexInfoKHR` to [VkGraphicsPipelineCreateInfo](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#VkGraphicsPipelineCreateInfo) when the fragment shader state subset is required.
If this structure is not provided for pipeline creation, it is equivalent to setting the value of each element of `pColorAttachmentInputIndices` to the value of its index within the array, `colorAttachmentCount` to the value of [VkPipelineRenderingCreateInfoKHR::colorAttachmentCount](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#VkPipelineRenderingCreateInfoKHR), and `pDepthInputAttachmentIndex` and `pStencilInputAttachmentIndex` to `NULL`.

`vkCmdSetRenderingInputAttachmentIndicesKHR` must only be called within a dynamic render pass instance.
If this command is not called, the default state is that each element of `pColorAttachmentInputIndices` to the value of its index within the array, and `pDepthInputAttachmentIndex` and `pStencilInputAttachmentIndex` are set to `NULL`.

The index of each element of `pColorAttachmentInputIndices` corresponds to the same index of a color attachment in a dynamic render pass, and the value of that element becomes the `InputAttachmentIndex` that refers to it, providing a way to remap input attachments to color attachments.
Values in `pColorAttachmentInputIndices` must each be unique.

If either of `pDepthInputAttachmentIndex` or `pStencilInputAttachmentIndex` are set to `NULL` it means that these are only accessible in the shader if the shader does not associate these input attachments with an `InputAttachmentIndex`.

If `pDepthInputAttachmentIndex`, `pStencilInputAttachmentIndex`, or any element of `pColorAttachmentInputIndices` is set to `VK_ATTACHMENT_UNUSED` it indicates that the respective attachment is not associated with an input attachment index, and cannot be accessed as an input attachment in the shader.

When issuing a draw call, the input attachment index mapping must match between the bound graphics pipeline and the command buffer state set by `vkCmdSetRenderingInputAttachmentIndicesKHR`.

`VkRenderingInputAttachmentIndexInfoKHR` can also be chained to [VkCommandBufferInheritanceInfo](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceInfo) when using secondary command buffers, to specify the input attachment index mapping in the primary command buffer when [vkCmdExecuteCommands](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#vkCmdExecuteCommands) is called.
If `VkRenderingInputAttachmentIndexInfoKHR` is not provided in the inheritance info, it is equivalent to providing it with the value of each element of `pColorAttachmentInputIndices` set to the value of its index within the array, `colorAttachmentCount` set to the value of [VkCommandBufferInheritanceRenderingInfo::colorAttachmentCount](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceRenderingInfo), and `pDepthInputAttachmentIndex` and `pStencilInputAttachmentIndex` set to `NULL`.
This information must match between the inheritance info and the state when [vkCmdExecuteCommands](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#vkCmdExecuteCommands) is called if there is a currently active render pass instance.

|  | The remapping functionality is provided primarily for porting existing content to the new API; new applications should set their index attachment indices consistently for all attachments in their shaders during a render pass; this functionality can be considered immediately deprecated. |
| --- | --- |

One quirk of render pass objects is that users can specify input attachments that are only used as input attachments.
For dynamic rendering, these cannot be specified by tagging them as another attachment type as enabled by the above structures.

Rather than specifying them in the render pass, as they must be associated with a descriptor, implementations will unconditionally fetch values from the input attachment descriptor if the `InputAttachmentIndex` is not mapped to another attachment.

|  | Some implementations may have to now provide a real descriptor when advertising this extension where they did not before - which may affect things like [VK_EXT_descriptor_buffer](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer), where the size of the descriptor is advertised. |
| --- | --- |

If [VK_EXT_shader_object](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_shader_object) is enabled, `vkCmdSetRenderingAttachmentLocationsKHR` and `vkCmdSetRenderingInputAttachmentIndicesKHR` are the only way to set the remapping state; the respective structures do not need to be chained to shader object creation or match any static state.

If [VK_EXT_rasterization_order_attachment_access](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_rasterization_order_attachment_access) is enabled, the pipeline depth/stencil state and color blend state bits can be used with dynamic rendering, with the same effect on input attachment reads as when used with render pass objects.
Specifically, this allows local reads from input attachments to read values from previous fragments at overlapping locations within the same render pass (even the same draw), without a barrier.
This interaction does not enable local reads between non-attachment resources without a barrier.

A small change is made to GLSL to allow the `input_attachment_index` qualifier to be omitted when specifying a subpass input.

HLSL’s SPIR-V translation currently requires subpass inputs to specify the `vk::input_attachment_index()` attribute on `SubpassInput` variables, and this will be relaxed to allow it to be omitted.

With a few lines of API code changes, it should be possible to trivially port most code using render pass objects to use dynamic rendering.
There are some exceptions - code which would use more color attachments than fit within the limit for a single subpass or dynamic rendering, switch depth/stencil attachments, or use non-framebuffer-space subpass dependencies cannot be expressed this way, and must be split into multiple dynamic render passes.
As an example, the following two pieces of code specify the same outcome:

// Write out the setup code.

vkCmdBeginRenderPass2(...);

vkCmdDraw(...);

vkCmdNextSubpass2(...);

vkCmdDraw(...);

vkCmdEndRenderPass2(...);

// Write the setup code

vkCmdBeginRendering(...);

vkCmdDraw(...);

vkCmdPipelineBarrier(...);

vkCmdDraw(...);

vkCmdEndRendering(...);

With multiple subpasses in a render pass, applications can reassociate the locations between different subpasses, and this is included to enable simple porting of shaders that do this to this extension.
It could be omitted but this would require pre-processing of shader code to replace the color indices to achieve the same effect, which is a big burden if an application is not already set up to do it.
It is a small concession for developers to make it significantly easier to port code, without adding much burden on implementers.

These extra bits of functionality require implementations to jump through hoops that may require splitting render passes internally; this extension is deliberately limited to functionality that all vendors can support without resorting to that, as it would increase the complexity of the API massively, particularly given this cannot be pre-computed without a dedicated object.

Several vendors (including those considered tilers) need a separate descriptor to read these images, and not having them would increase driver complexity and may decrease performance - but we could revisit this.

Note: `TRANSIENT` attachments still work with this extension, allowing a path to avoid the memory allocation, just as with render pass objects.

That should be a separate extension if needed.

To make this work, something as simple as a decoration on a color output or input attachment stating that the format is ignored and raw bits are written would suffice, but that is beyond the scope of this extension, and may not be supportable by all implementers.

This is not efficient or easily implementable in all cases for many vendors.
For implementations that do support it, that feature is provided as an interaction with [VK_EXT_rasterization_order_attachment_access](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_rasterization_order_attachment_access.adoc).

Yes, this allows more flexibility for applications to implement functionality between fragments.
This should not be a significant implementation burden, but it could be removed if that assumption turns out to be false.

This would make the API more complex for what is likely minimal gain.
Applications can emulate this themselves by putting such data into a placeholder attachment that is never written, if there is space for another attachment.
If there is not space for another attachment, the implementation would not be able to prefetch anyway.

Requiring this state to match between the pipeline and command buffer is in line with how render pass objects worked.
Render pass objects are provided both in a pipeline and when beginning a renderpass, and different vendors consume these mappings at different points.
Some vendors modify generated shader code to support these mappings, while others change hardware state when the commands execute.
To accommodate both types of implementation without hurting performance when not using these mappings, this state is again required in both places.
