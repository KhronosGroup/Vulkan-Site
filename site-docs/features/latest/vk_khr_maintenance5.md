# VK_KHR_maintenance5

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_maintenance5.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Issue Details and Solution Space](#_issue_details_and_solution_space)
- [2._Issue_Details_and_Solution_Space](#_issue_details_and_solution_space)
- [2.1. Default PointSize of 1.0](#_default_pointsize_of_1_0)
- [2.1._Default_PointSize_of_1.0](#_default_pointsize_of_1_0)
- [2.2. Indication of parallelogram or Bresenham non-strict lines](#_indication_of_parallelogram_or_bresenham_non_strict_lines)
- [2.2._Indication_of_parallelogram_or_Bresenham_non-strict_lines](#_indication_of_parallelogram_or_bresenham_non_strict_lines)
- [2.3. A1B5G5R5 format](#_a1b5g5r5_format)
- [2.3._A1B5G5R5_format](#_a1b5g5r5_format)
- [2.4. vkGetPhysicalDeviceFormatProperties with unknown formats](#_vkgetphysicaldeviceformatproperties_with_unknown_formats)
- [2.4._vkGetPhysicalDeviceFormatProperties_with_unknown_formats](#_vkgetphysicaldeviceformatproperties_with_unknown_formats)
- [2.5. A vkGetRenderAreaGranularity equivalent for dynamic rendering](#_a_vkgetrenderareagranularity_equivalent_for_dynamic_rendering)
- [2.5._A_vkGetRenderAreaGranularity_equivalent_for_dynamic_rendering](#_a_vkgetrenderareagranularity_equivalent_for_dynamic_rendering)
- [2.6. vkGetDeviceProcAddr to return NULL for functions beyond application version](#_vkgetdeviceprocaddr_to_return_null_for_functions_beyond_application_version)
- [2.6._vkGetDeviceProcAddr_to_return_NULL_for_functions_beyond_application_version](#_vkgetdeviceprocaddr_to_return_null_for_functions_beyond_application_version)
- [2.7. Add vkCmdBindIndexBuffer2KHR with a size parameter](#_add_vkcmdbindindexbuffer2khr_with_a_size_parameter)
- [2.7._Add_vkCmdBindIndexBuffer2KHR_with_a_size_parameter](#_add_vkcmdbindindexbuffer2khr_with_a_size_parameter)
- [2.8. Multisample coverage operations and sample counting property](#_multisample_coverage_operations_and_sample_counting_property)
- [2.8._Multisample_coverage_operations_and_sample_counting_property](#_multisample_coverage_operations_and_sample_counting_property)
- [2.9. VK_REMAINING_ARRAY_LAYERS for VkImageSubresourceLayers.layerCount](#_vk_remaining_array_layers_for_vkimagesubresourcelayers_layercount)
- [2.9._VK_REMAINING_ARRAY_LAYERS_for_VkImageSubresourceLayers.layerCount](#_vk_remaining_array_layers_for_vkimagesubresourcelayers_layercount)
- [2.10. VK_WHOLE_SIZE for pSizes argument of vkCmdBindVertexBuffers2](#_vk_whole_size_for_psizes_argument_of_vkcmdbindvertexbuffers2)
- [2.10._VK_WHOLE_SIZE_for_pSizes_argument_of_vkCmdBindVertexBuffers2](#_vk_whole_size_for_psizes_argument_of_vkcmdbindvertexbuffers2)
- [2.11. vkGetImageSubresourceLayout query without having to create a placeholder image](#_vkgetimagesubresourcelayout_query_without_having_to_create_a_placeholder_image)
- [2.11._vkGetImageSubresourceLayout_query_without_having_to_create_a_placeholder_image](#_vkgetimagesubresourcelayout_query_without_having_to_create_a_placeholder_image)
- [2.12. Reliable/deterministic way to detect device loss](#_reliabledeterministic_way_to_detect_device_loss)
- [2.12._Reliable/deterministic_way_to_detect_device_loss](#_reliabledeterministic_way_to_detect_device_loss)
- [2.13. Lack of available flag bits](#_lack_of_available_flag_bits)
- [2.13._Lack_of_available_flag_bits](#_lack_of_available_flag_bits)
- [2.14. Sample mask test and sample counting property](#_sample_mask_test_and_sample_counting_property)
- [2.14._Sample_mask_test_and_sample_counting_property](#_sample_mask_test_and_sample_counting_property)
- [2.15. Deprecation of VkShaderModule](#_deprecation_of_vkshadermodule)
- [2.15._Deprecation_of_VkShaderModule](#_deprecation_of_vkshadermodule)
- [2.16._A8_UNORM_format](#_a8_unorm_format)
- [2.17. Relax VkBufferView creation requirement](#_relax_vkbufferview_creation_requirement)
- [2.17._Relax_VkBufferView_creation_requirement](#_relax_vkbufferview_creation_requirement)
- [2.18. Appearance when using VK_POLYGON_MODE_POINT together with PointSize](#_appearance_when_using_vk_polygon_mode_point_together_with_pointsize)
- [2.18._Appearance_when_using_VK_POLYGON_MODE_POINT_together_with_PointSize](#_appearance_when_using_vk_polygon_mode_point_together_with_pointsize)
- [2.19. Copying between different image types](#_copying_between_different_image_types)
- [2.19._Copying_between_different_image_types](#_copying_between_different_image_types)
- [2.20._Need_a_way_to_indicate_when_SWIZZLE_ONE_has_defined_results_when_used_with_depth-stencil_formats](#_need_a_way_to_indicate_when_swizzle_one_has_defined_results_when_used_with_depth_stencil_formats)
- [3. Proposal](#_proposal)
- [3.1. Default PointSize of 1.0](#_default_pointsize_of_1_0_2)
- [3.1._Default_PointSize_of_1.0](#_default_pointsize_of_1_0_2)
- [3.2. Indication of parallelogram or Bresenham non-strict lines](#_indication_of_parallelogram_or_bresenham_non_strict_lines_2)
- [3.2._Indication_of_parallelogram_or_Bresenham_non-strict_lines](#_indication_of_parallelogram_or_bresenham_non_strict_lines_2)
- [3.3. A1B5G5R5 format](#_a1b5g5r5_format_2)
- [3.3._A1B5G5R5_format](#_a1b5g5r5_format_2)
- [3.4. vkGetPhysicalDeviceFormatProperties with unknown formats](#_vkgetphysicaldeviceformatproperties_with_unknown_formats_2)
- [3.4._vkGetPhysicalDeviceFormatProperties_with_unknown_formats](#_vkgetphysicaldeviceformatproperties_with_unknown_formats_2)
- [3.5. A vkGetRenderAreaGranularity equivalent for dynamic rendering](#_a_vkgetrenderareagranularity_equivalent_for_dynamic_rendering_2)
- [3.5._A_vkGetRenderAreaGranularity_equivalent_for_dynamic_rendering](#_a_vkgetrenderareagranularity_equivalent_for_dynamic_rendering_2)
- [3.6. vkGetDeviceProcAddr to return NULL for functions beyond application version](#_vkgetdeviceprocaddr_to_return_null_for_functions_beyond_application_version_2)
- [3.6._vkGetDeviceProcAddr_to_return_NULL_for_functions_beyond_application_version](#_vkgetdeviceprocaddr_to_return_null_for_functions_beyond_application_version_2)
- [3.7. Add vkCmdBindIndexBuffer2KHR with a size parameter](#_add_vkcmdbindindexbuffer2khr_with_a_size_parameter_2)
- [3.7._Add_vkCmdBindIndexBuffer2KHR_with_a_size_parameter](#_add_vkcmdbindindexbuffer2khr_with_a_size_parameter_2)
- [3.8. Multisample coverage operations and sample counting property](#_multisample_coverage_operations_and_sample_counting_property_2)
- [3.8._Multisample_coverage_operations_and_sample_counting_property](#_multisample_coverage_operations_and_sample_counting_property_2)
- [3.9. VK_REMAINING_ARRAY_LAYERS for VkImageSubresourceLayers.layerCount](#_vk_remaining_array_layers_for_vkimagesubresourcelayers_layercount_2)
- [3.9._VK_REMAINING_ARRAY_LAYERS_for_VkImageSubresourceLayers.layerCount](#_vk_remaining_array_layers_for_vkimagesubresourcelayers_layercount_2)
- [3.10. VK_WHOLE_SIZE for pSizes argument of vkCmdBindVertexBuffers2](#_vk_whole_size_for_psizes_argument_of_vkcmdbindvertexbuffers2_2)
- [3.10._VK_WHOLE_SIZE_for_pSizes_argument_of_vkCmdBindVertexBuffers2](#_vk_whole_size_for_psizes_argument_of_vkcmdbindvertexbuffers2_2)
- [3.11. vkGetImageSubresourceLayout query without having to create a placeholder image](#_vkgetimagesubresourcelayout_query_without_having_to_create_a_placeholder_image_2)
- [3.11._vkGetImageSubresourceLayout_query_without_having_to_create_a_placeholder_image](#_vkgetimagesubresourcelayout_query_without_having_to_create_a_placeholder_image_2)
- [3.12. Reliable/deterministic way to detect device loss](#_reliabledeterministic_way_to_detect_device_loss_2)
- [3.12._Reliable/deterministic_way_to_detect_device_loss](#_reliabledeterministic_way_to_detect_device_loss_2)
- [3.13. Lack of available flag bits](#_lack_of_available_flag_bits_2)
- [3.13._Lack_of_available_flag_bits](#_lack_of_available_flag_bits_2)
- [3.14. Sample mask test and sample counting property](#_sample_mask_test_and_sample_counting_property_2)
- [3.14._Sample_mask_test_and_sample_counting_property](#_sample_mask_test_and_sample_counting_property_2)
- [3.15. Deprecating Shader Modules](#_deprecating_shader_modules)
- [3.15._Deprecating_Shader_Modules](#_deprecating_shader_modules)
- [3.16._A8_UNORM_format](#_a8_unorm_format_2)
- [3.17. Relax VkBufferView creation requirement](#_relax_vkbufferview_creation_requirement_2)
- [3.17._Relax_VkBufferView_creation_requirement](#_relax_vkbufferview_creation_requirement_2)
- [3.18. Appearance when using VK_POLYGON_MODE_POINT together with PointSize](#_appearance_when_using_vk_polygon_mode_point_together_with_pointsize_2)
- [3.18._Appearance_when_using_VK_POLYGON_MODE_POINT_together_with_PointSize](#_appearance_when_using_vk_polygon_mode_point_together_with_pointsize_2)
- [3.19. Copying between different image types](#_copying_between_different_image_types_2)
- [3.19._Copying_between_different_image_types](#_copying_between_different_image_types_2)
- [3.20._Need_a_way_to_indicate_when_SWIZZLE_ONE_has_defined_results_when_used_with_depth-stencil_formats](#_need_a_way_to_indicate_when_swizzle_one_has_defined_results_when_used_with_depth_stencil_formats_2)
- [4. Issues](#_issues)
- [5. Further Functionality](#_further_functionality)
- [5._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Issue Details and Solution Space](#_issue_details_and_solution_space)

[2.1. Default PointSize of 1.0](#_default_pointsize_of_1_0)
[2.2. Indication of parallelogram or Bresenham non-strict lines](#_indication_of_parallelogram_or_bresenham_non_strict_lines)
[2.3. A1B5G5R5 format](#_a1b5g5r5_format)
[2.4. vkGetPhysicalDeviceFormatProperties with unknown formats](#_vkgetphysicaldeviceformatproperties_with_unknown_formats)
[2.5. A vkGetRenderAreaGranularity equivalent for dynamic rendering](#_a_vkgetrenderareagranularity_equivalent_for_dynamic_rendering)
[2.6. vkGetDeviceProcAddr to return NULL for functions beyond application version](#_vkgetdeviceprocaddr_to_return_null_for_functions_beyond_application_version)
[2.7. Add vkCmdBindIndexBuffer2KHR with a size parameter](#_add_vkcmdbindindexbuffer2khr_with_a_size_parameter)
[2.8. Multisample coverage operations and sample counting property](#_multisample_coverage_operations_and_sample_counting_property)
[2.9. VK_REMAINING_ARRAY_LAYERS for VkImageSubresourceLayers.layerCount](#_vk_remaining_array_layers_for_vkimagesubresourcelayers_layercount)
[2.10. VK_WHOLE_SIZE for pSizes argument of vkCmdBindVertexBuffers2](#_vk_whole_size_for_psizes_argument_of_vkcmdbindvertexbuffers2)
[2.11. vkGetImageSubresourceLayout query without having to create a placeholder image](#_vkgetimagesubresourcelayout_query_without_having_to_create_a_placeholder_image)
[2.12. Reliable/deterministic way to detect device loss](#_reliabledeterministic_way_to_detect_device_loss)
[2.13. Lack of available flag bits](#_lack_of_available_flag_bits)
[2.14. Sample mask test and sample counting property](#_sample_mask_test_and_sample_counting_property)
[2.15. Deprecation of VkShaderModule](#_deprecation_of_vkshadermodule)
[2.16. A8_UNORM format](#_a8_unorm_format)
[2.17. Relax VkBufferView creation requirement](#_relax_vkbufferview_creation_requirement)
[2.18. Appearance when using VK_POLYGON_MODE_POINT together with PointSize](#_appearance_when_using_vk_polygon_mode_point_together_with_pointsize)
[2.19. Copying between different image types](#_copying_between_different_image_types)
[2.20. Need a way to indicate when SWIZZLE_ONE has defined results when used with depth-stencil formats](#_need_a_way_to_indicate_when_swizzle_one_has_defined_results_when_used_with_depth_stencil_formats)

[3. Proposal](#_proposal)

[3.1. Default PointSize of 1.0](#_default_pointsize_of_1_0_2)
[3.2. Indication of parallelogram or Bresenham non-strict lines](#_indication_of_parallelogram_or_bresenham_non_strict_lines_2)
[3.3. A1B5G5R5 format](#_a1b5g5r5_format_2)
[3.4. vkGetPhysicalDeviceFormatProperties with unknown formats](#_vkgetphysicaldeviceformatproperties_with_unknown_formats_2)
[3.5. A vkGetRenderAreaGranularity equivalent for dynamic rendering](#_a_vkgetrenderareagranularity_equivalent_for_dynamic_rendering_2)
[3.6. vkGetDeviceProcAddr to return NULL for functions beyond application version](#_vkgetdeviceprocaddr_to_return_null_for_functions_beyond_application_version_2)
[3.7. Add vkCmdBindIndexBuffer2KHR with a size parameter](#_add_vkcmdbindindexbuffer2khr_with_a_size_parameter_2)
[3.8. Multisample coverage operations and sample counting property](#_multisample_coverage_operations_and_sample_counting_property_2)
[3.9. VK_REMAINING_ARRAY_LAYERS for VkImageSubresourceLayers.layerCount](#_vk_remaining_array_layers_for_vkimagesubresourcelayers_layercount_2)
[3.10. VK_WHOLE_SIZE for pSizes argument of vkCmdBindVertexBuffers2](#_vk_whole_size_for_psizes_argument_of_vkcmdbindvertexbuffers2_2)
[3.11. vkGetImageSubresourceLayout query without having to create a placeholder image](#_vkgetimagesubresourcelayout_query_without_having_to_create_a_placeholder_image_2)
[3.12. Reliable/deterministic way to detect device loss](#_reliabledeterministic_way_to_detect_device_loss_2)
[3.13. Lack of available flag bits](#_lack_of_available_flag_bits_2)
[3.14. Sample mask test and sample counting property](#_sample_mask_test_and_sample_counting_property_2)
[3.15. Deprecating Shader Modules](#_deprecating_shader_modules)
[3.16. A8_UNORM format](#_a8_unorm_format_2)
[3.17. Relax VkBufferView creation requirement](#_relax_vkbufferview_creation_requirement_2)
[3.18. Appearance when using VK_POLYGON_MODE_POINT together with PointSize](#_appearance_when_using_vk_polygon_mode_point_together_with_pointsize_2)
[3.19. Copying between different image types](#_copying_between_different_image_types_2)
[3.20. Need a way to indicate when SWIZZLE_ONE has defined results when used with depth-stencil formats](#_need_a_way_to_indicate_when_swizzle_one_has_defined_results_when_used_with_depth_stencil_formats_2)

[4. Issues](#_issues)
[5. Further Functionality](#_further_functionality)

This proposal details and addresses the issues solved by the `VK_KHR_maintenance5` extension.

Over time, a collection of minor features, none of which would warrant an entire extension of their own, requires the creation of a maintenance extension.

The following is a list of issues considered in this proposal:

* 
Allow PointSize to take a default value of 1.0 when it is not written, rather than being undefined

* 
A device property to indicate whether non-strict lines use parallelogram or Bresenham.

* 
Add a A1B5G5R5 format (corresponding to `GL_UNSIGNED_SHORT_1_5_5_5_REV`)

* 
Allow vkGetPhysicalDeviceFormatProperties with unknown formats

* 
Add a vkGetRenderAreaGranularity equivalent for dynamic rendering

* 
Require vkGetDeviceProcAddr to return NULL for functions beyond application version

* 
Index buffer range specification

* 
Add a property to indicate multisample coverage operations are performed after sample counting in EarlyFragmentTests mode

* 
Add VK_REMAINING_ARRAY_LAYERS support to VkImageSubresourceLayers.layerCount

* 
Allow VK_WHOLE_SIZE for pSizes argument of vkCmdBindVertexBuffers2

* 
Add support for a new vkGetDeviceImageSubresourceLayout to allow a vkGetImageSubresourceLayout query without having to create a placeholder image

* 
Ensure we have a reliable/deterministic way to detect device loss

* 
We are running out of spare bits in various FlagBits

* 
Add a property to indicate sample mask test operations are performed after sample counting in EarlyFragmentTests mode

* 
Deprecate shader modules to avoid management of that object in the API

* 
Add a A8_UNORM format

* 
Relax VkBufferView creation requirements

* 
Appearance when using VK_POLYGON_MODE_POINT together with PointSize

* 
Enabling copies between images of any dimensionality

* 
Need a way to indicate when SWIZZLE_ONE has defined results when used with depth-stencil formats

It is unclear in the specification if the `PointSize` builtin is required to be written, and if it is not, what the default size is.

Some applications need to know whether the rasterization algorithm used for non-strict lines is parallelogram or Bresenham style.

There is a request to add a format equivalent to GL_UNSIGNED_SHORT_1_5_5_5_REV for emulation.

The current specification prohibits `vkGetPhysicalDeviceFormatProperties` from being called with a `VkFormat` that is from an API version higher than that of the device, or from a device-level extension that is not supported by the device.
In order to query a format’s support, applications must first query the relevant extension/version/feature beforehand, complicating format queries.

Some tile-based GPUs can benefit from providing an optimal render area granularity as the basis for a performance hint.

Existing implementations have different behavior when returning function pointers from `vkGetDeviceProcAddr()`
for supported core functions of versions greater than the version requested by the application.

With `vkCmdBindIndexBuffer`, it is not possible to communicate the size of the subrange buffer used as index data.
Robustness therefore operates on the size of the underlying buffer, which may be larger than the subrange that contains index data.
A new function can be introduced to add the necessary size information for robustness.

Some hardware performs sample counting after multisample coverage operations when the EarlyFragmentTests execution mode is declared in a pixel shader, but the specification says "If the fragment shader declares the EarlyFragmentTests execution mode, fragment shading and multisample coverage operations are instead performed after sample counting."

`layerCount` in `VkImageSubresourceLayers` unintentionally does not support `VK_REMAINING_ARRAY_LAYERS`.

`pSizes` in `vkCmdBindVertexBuffers2` unintentionally does not support `VK_WHOLE_SIZE`.

There is a potential implementation overhead when querying the subresource layout of an image due to object creation.  This overhead could be reduced by a function that works in a similar way to `vkGetDeviceImageMemoryRequirements()` which uses the image creation properties, rather than an image object, to perform the query.

All existing entry points that are capable of returning
`VK_ERROR_DEVICE_LOST` have some form of exemption or
special-case allowing for other return values to be returned even when a device
is irrecoverably lost. These exemptions are all necessary due to the
asynchronous nature of device-loss detection, but this makes it difficult for
application developers to reason about how to reliably detect device-loss.

Both `VkPipelineCreateFlagBits` and `VkBufferCreateFlagBits` are running out of available bits for new extensions.

The specification says "If the fragment shader declares the EarlyFragmentTests
execution mode, fragment shading and multisample coverage operations are instead
performed after sample counting", but some hardware performs the sample mask test
after sample counting operations when the EarlyFragmentTests execution mode is
declared in a pixel shader.

Shader modules are transient objects used to create pipelines,
originally put in the Vulkan API to enable pre-compilation of
SPIR-V to reduce duplicated work at pipeline creation.

In practice though, few implementations do anything useful with these objects, and they
end up just being an unnecessary copy and a waste of memory while they
exist.
They also are yet another object for applications to manage, which is
development overhead that would be useful to remove.

Solutions here should have the following properties:

* 
Not require object creation

* 
Allow shader code to be passed directly from application memory to the pipeline
creation

* 
Be as simple as possible

[VK_EXT_graphics_pipeline_library](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_graphics_pipeline_library)
already introduced a simple way to do this, which is adopted by this
extension.

This provides direct compatibility with D3D11 and D3D12 for layering.

Some users of the Vulkan API (for example, OpenGL API emulation libraries) have a
hard time figuring out in advance how one of their VkBuffer objects is going to be
used with VkBufferView. Relaxing the requirement that the VkBufferView format is
supported for all the usages of the VkBuffer would help.

Some hardware does not take point size into account when rasterizing polygons with VK_POLYGON_MODE_POINT.

Copies between different image types other than between 2D and 3D is unclear, and untested. This flexibility is useful for some applications.

Some implementations have undefined results when SWIZZLE_ONE is used with a depth-stencil format, so the default Vulkan behavior in this case is undefined.
For many implementations this combination *is* defined, however, so it is useful to be able to determine programmatically when that is the case.

Items introduced by this extension are:

Points now take a default size of 1.0 if the `PointSize` builtin is not written.

Two new properties are added:

* 
`nonStrictSinglePixelWideLinesUseParallelogram` reports the rasterization algorithm used for lines of width 1.0

* 
`nonStrictWideLinesUseParallelogram` reports the rasterization algorithm used for lines of width greater than 1.0

An optional format VK_FORMAT_A1B5G5R5_UNORM_PACK16_KHR is added.

Physical-device-level functions can now be called with any value in the valid range for a type beyond the defined enumerants, such that applications can avoid checking individual features, extensions, or versions before querying supported properties of a particular enumerant.

A new function provides the ability to query the implementation’s preferred
render area granularity for a render pass instance:

void vkGetRenderingAreaGranularityKHR(
    VkDevice                                    device,
    const VkRenderingAreaInfoKHR*               pRenderingAreaInfo,
    VkExtent2D*                                 pGranularity);

The specification has been changed to require `vkGetDeviceProcAddr()` to return `NULL` for supported core functions beyond the version requested by the application.

A new entry point `vkCmdBindIndexBuffer2KHR` is added:

VKAPI_ATTR void VKAPI_CALL vkCmdBindIndexBuffer2KHR(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    buffer,
    VkDeviceSize                                offset,
    VkDeviceSize                                size,
    VkIndexType                                 indexType);

A new `earlyFragmentMultisampleCoverageAfterSampleCounting` property is added.

Support for using `VK_REMAINING_ARRAY_LAYERS` as the `layerCount` member of `VkImageSubresourceLayers` is added.

Support for using `VK_WHOLE_SIZE` in the `pSizes` parameter of `vkCmdBindVertexBuffers2` is added.

A new `vkGetDeviceImageSubresourceLayoutKHR` function provides the ability to query the subresource layout for an image without requiring an image object, and a KHR version of `vkGetImageSubresourceLayout2EXT`:

typedef struct VkImageSubresource2KHR {
    VkStructureType       sType;
    void*                 pNext;
    VkImageSubresource    imageSubresource;
} VkImageSubresource2KHR;

typedef struct VkSubresourceLayout2KHR {
    VkStructureType        sType;
    void*                  pNext;
    VkSubresourceLayout    subresourceLayout;
} VkSubresourceLayout2KHR;

typedef VkSubresourceLayout2KHR VkSubresourceLayout2EXT;
typedef VkImageSubresource2KHR VkImageSubresource2EXT;

typedef struct VkDeviceImageSubresourceInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    const VkImageCreateInfo*         pCreateInfo;
    const VkImageSubresource2KHR*    pSubresource;
} VkDeviceImageSubresourceInfoKHR;

VKAPI_ATTR void VKAPI_CALL vkGetDeviceImageSubresourceLayoutKHR(
    VkDevice                                    device,
    const VkDeviceImageSubresourceInfoKHR*      pInfo,
    VkSubresourceLayout2KHR*                    pLayout);

VKAPI_ATTR void VKAPI_CALL vkGetImageSubresourceLayout2KHR(
    VkDevice                                    device,
    VkImage                                     image,
    const VkImageSubresource2KHR*               pSubresource,
    VkSubresourceLayout2KHR*                    pLayout);

Following device-loss, entry points that may return `VK_ERROR_DEVICE_LOST` do so
in a more consistent manner.

Two new flags words are added, along with structures to use them:

* 
`VkPipelineCreateFlagBits2KHR` and `VkPipelineCreateFlags2CreateInfoKHR`

* 
`VkBufferUsageFlagBits2KHR` and `VkBufferUsageFlags2CreateInfoKHR`

A new `earlyFragmentSampleMaskTestBeforeSampleCounting` property is added.

Shader modules are deprecated by allowing
[VkShaderModuleCreateInfo](https://docs.vulkan.org/spec/latest/chapters/shaders.html#VkShaderModuleCreateInfo) to be
chained to
[VkPipelineShaderStageCreateInfo](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#VkPipelineShaderStageCreateInfo),
and allowing the [VkShaderModule](https://docs.vulkan.org/spec/latest/chapters/shaders.html#VkShaderModule) to be
[VK_NULL_HANDLE](https://docs.vulkan.org/spec/latest/appendices/boilerplate.html#VK_NULL_HANDLE) in this case.
Shader modules are not being removed, but it is recommended to not use them in order to save memory and avoid unnecessary copies.

For example, where previously an application would have to create a shader
module, it can now simply do this:

VkShaderModuleCreateInfo computeShader = {
    .sType = VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO,
    .pNext = NULL,
    .flags = 0,
    .codeSize = ...,
    .pCode = ... };

VkComputePipelineCreateInfo computePipeline = {
    .sType = VK_STRUCTURE_TYPE_COMPUTE_PIPELINE_CREATE_INFO,
    .pNext = NULL,
    .flags = 0,
    .stage = {
        .sType = VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_CREATE_INFO,
        .pNext = &computeShader,
        .flags = VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT | VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT,
        .stage = VK_SHADER_STAGE_COMPUTE_BIT,
        .module = VK_NULL_HANDLE,
        .pName = ...,
        .pSpecializationInfo = ... },
    .layout = ...,
    .basePipelineHandle = 0,
    .basePipelineIndex = 0 };

An optional format VK_FORMAT_A8_UNORM_KHR is added.

Use the new `VkBufferUsageFlags2CreateInfoKHR` structure chained
into the `pNext` of `VkBufferViewCreateInfo` to specify a
subset of usage of the associated `VkBuffer`.

A new `polygonModePointSize` property is added.

Allow copies between different image types, treating 1D images as 2D images
with a height of 1.

Introduce a `depthStencilSwizzleOneSupport`
property which an implementation should expose to indicate that this
behavior is defined.

None.

None.
