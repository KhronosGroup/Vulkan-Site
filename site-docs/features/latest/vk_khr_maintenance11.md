# VK_KHR_maintenance11

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_maintenance11.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Proposal](#_proposal)
- [2.1. Add D3D compatibility for mismatch between Arrayed in shaders and the arrayness of the underlying descriptor](#_add_d3d_compatibility_for_mismatch_between_arrayed_in_shaders_and_the_arrayness_of_the_underlying_descriptor)
- [2.1._Add_D3D_compatibility_for_mismatch_between_Arrayed_in_shaders_and_the_arrayness_of_the_underlying_descriptor](#_add_d3d_compatibility_for_mismatch_between_arrayed_in_shaders_and_the_arrayness_of_the_underlying_descriptor)
- [2.2. Clarify the pipeline depth clipping state](#_clarify_the_pipeline_depth_clipping_state)
- [2.2._Clarify_the_pipeline_depth_clipping_state](#_clarify_the_pipeline_depth_clipping_state)
- [2.3. Enable shader object functionality to mimic VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](#_enable_shader_object_functionality_to_mimic_vk_pipeline_layout_create_independent_sets_bit_ext)
- [2.3._Enable_shader_object_functionality_to_mimic_VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](#_enable_shader_object_functionality_to_mimic_vk_pipeline_layout_create_independent_sets_bit_ext)
- [2.4. Allow queueFamilyIndexCount of 1 in VkBufferCreateInfo, VkImageCreateInfo and others](#_allow_queuefamilyindexcount_of_1_in_vkbuffercreateinfo_vkimagecreateinfo_and_others)
- [2.4._Allow_queueFamilyIndexCount_of_1_in_VkBufferCreateInfo,_VkImageCreateInfo_and_others](#_allow_queuefamilyindexcount_of_1_in_vkbuffercreateinfo_vkimagecreateinfo_and_others)
- [2.5. Require minImageTransferGranularity to be (1,1,1) even on transfer-only queues](#_require_minimagetransfergranularity_to_be_111_even_on_transfer_only_queues)
- [2.5._Require_minImageTransferGranularity_to_be_(1,1,1)_even_on_transfer-only_queues](#_require_minimagetransfergranularity_to_be_111_even_on_transfer_only_queues)
- [2.6. Relax the requirement that when copying between a buffer and an image, bufferOffset has to be a multiple of 4 when using a transfer-only queue](#_relax_the_requirement_that_when_copying_between_a_buffer_and_an_image_bufferoffset_has_to_be_a_multiple_of_4_when_using_a_transfer_only_queue)
- [2.6._Relax_the_requirement_that_when_copying_between_a_buffer_and_an_image,_bufferOffset_has_to_be_a_multiple_of_4_when_using_a_transfer-only_queue](#_relax_the_requirement_that_when_copying_between_a_buffer_and_an_image_bufferoffset_has_to_be_a_multiple_of_4_when_using_a_transfer_only_queue)
- [3. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Proposal](#_proposal)

[2.1. Add D3D compatibility for mismatch between `Arrayed` in shaders and the arrayness of the underlying descriptor](#_add_d3d_compatibility_for_mismatch_between_arrayed_in_shaders_and_the_arrayness_of_the_underlying_descriptor)
[2.2. Clarify the pipeline depth clipping state](#_clarify_the_pipeline_depth_clipping_state)
[2.3. Enable shader object functionality to mimic `VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT`](#_enable_shader_object_functionality_to_mimic_vk_pipeline_layout_create_independent_sets_bit_ext)
[2.4. Allow `queueFamilyIndexCount` of 1 in `VkBufferCreateInfo`, `VkImageCreateInfo` and others](#_allow_queuefamilyindexcount_of_1_in_vkbuffercreateinfo_vkimagecreateinfo_and_others)
[2.5. Require `minImageTransferGranularity` to be (1,1,1) even on transfer-only queues](#_require_minimagetransfergranularity_to_be_111_even_on_transfer_only_queues)
[2.6. Relax the requirement that when copying between a buffer and an image, `bufferOffset` has to be a multiple of 4 when using a transfer-only queue](#_relax_the_requirement_that_when_copying_between_a_buffer_and_an_image_bufferoffset_has_to_be_a_multiple_of_4_when_using_a_transfer_only_queue)

[3. Issues](#_issues)

This proposal details and addresses the issues solved by the `VK_KHR_maintenance11` extension.

Over time, a collection of minor features, none of which would warrant an
entire extension of their own, requires the creation of a maintenance
extension.

The following is a list of issues considered in this proposal:

* 
Add D3D compatibility for mismatch between `Arrayed` in shaders and the arrayness of the underlying descriptor

* 
Clarify the pipeline depth clipping state

* 
Enable shader object functionality to mimic `VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT`

* 
Allow `queueFamilyIndexCount` of 1 in `VkBufferCreateInfo`, `VkImageCreateInfo` and others

* 
Require `minImageTransferGranularity` to be (1,1,1) even on transfer-only queues

* 
When copying between a buffer and an image, do not require `bufferOffset` to be a multiple of 4

Items introduced by this extension are:

In D3D, 1D and 2D images which contain a single array layer can be freely interpreted as both a non-arrayed and arrayed descriptor in the shader.
The new `VK_IMAGE_CREATE_ALIAS_SINGLE_LAYER_DESCRIPTOR_BIT_KHR` flag enables this compatibility for both sampled and storage images.

The state of depth clipping in the pipeline was made ambiguous with
the interaction of `VK_EXT_depth_clip_enable` and
`VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT`.

This clarifies that when the pipeline is created without
`VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT` being set and without the
`VkPipelineRasterizationDepthClipStateCreateInfoEXT` struct
that the depth clipping state is the inverse of the `depthClampEnable`
state.

During initial development of `VK_EXT_shader_object`, this functionality was considered but ultimately rejected.
Later, `VK_NV_per_stage_descriptor_set` was created to bridge the gap, but this extension is too broadly scoped to resolve
the feature gap between `VK_EXT_graphics_pipeline_library` and `VK_EXT_shader_object`.

Applications can now use the new `VkShaderCreateFlagBitsEXT` flag:

#define VK_SHADER_CREATE_INDEPENDENT_SETS_BIT_KHR  ((VkShaderCreateFlagBitsEXT)0x00040000UL)

When creating shader objects, this flag can be used as in the below pseudocode example:

VkShaderCreateInfoEXT vertex = {
  VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT,
  NULL,
  VK_SHADER_CREATE_INDEPENDENT_SETS_BIT_KHR,
  VK_SHADER_STAGE_VERTEX_BIT,
  0,
  VK_SHADER_CODE_TYPE_SPIRV_EXT,
  pSize,
  pCode,
  "main",
  2,
  {vertexSetLayout, VK_NULL_HANDLE},
  0,
  NULL,
  NULL
};

VkShaderCreateInfoEXT fragment = {
  VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT,
  NULL,
  VK_SHADER_CREATE_INDEPENDENT_SETS_BIT_KHR,
  VK_SHADER_STAGE_FRAGMENT_BIT,
  0,
  VK_SHADER_CODE_TYPE_SPIRV_EXT,
  pSize,
  pCode,
  "main",
  2,
  {VK_NULL_HANDLE, fragmentSetLayout},
  0,
  NULL,
  NULL
};

vkCreateShadersEXT(device, 1, &vertex, NULL, &vertexShader);
vkCreateShadersEXT(device, 1, &fragment, NULL, &fragmentShader);

When binding these shader objects together, `vertexShader` will use `vertexSetLayout` and `fragmentShader` will use `fragmentSetLayout`.

When drawing with shader objects created this way the pipeline layout of the bound
descriptor sets needs to be created with the `VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT`
flag to ensure descriptor compatibility between the shader objects and the descriptor sets.
In addition, if the bound shader objects were also created with `VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT`
then pipeline layout used for the bound descriptor sets must also be created with the new
`VK_PIPELINE_LAYOUT_CREATE_NO_TASK_SHADER_BIT_KHR` to ensure descriptor set compatibility
between the mesh-only shader object and the descriptor sets.

When specifying queue family indices with concurrent sharing mode, developers
have to explicitly handle a case when there is just one family specified, by
setting the sharing mode to `VK_SHARING_MODE_EXCLUSIVE`. This may arise, among
other cases, when the implementation has just one queue family. Doing this can
now be skipped and applications may specify `VK_SHARING_MODE_CONCURRENT` as long
as there is at least one queue family specified.

Determining whether an image copy can be performed on a particular transfer-only
queue family is not trivial: the application needs to know the block extent of
the each image’s format, extents of the images, copy offset and copy extent, and
the check itself is not particularly easy to implement. Moreover,
opportunistically using transfer-only queues could necessitate structuring the
application in a way that the decision whether to perform a copy command on a
transfer-only, or a more capable compute or graphics queue, can be performed
right at the copy command recording time.

At the same time, the implementations that report `minImageTransferGranularity`
of their transfer-only queues to be something other than (1,1,1) also have
to implement certain operations on those transfer-only queue families using
compute or graphics, so they likely already have the "transfer and compute in a
trenchcoat" kind of infrastructure.

Requiring `minImageTransferGranularity` of transfer-only queue families to
always be (1,1,1) removes the need for applications to perform complicated
checks and makes using transfer-only queues more accessible.

An `optimalImageTransferGranularity` queue family property is added to
communicate conditions when the implementation might turn to a more expensive
copy strategy.

Similar to the previous item, this change brings image copy operations on
transfer-only queue families to be more in-line with copy operations on compute
and graphics.

None.
