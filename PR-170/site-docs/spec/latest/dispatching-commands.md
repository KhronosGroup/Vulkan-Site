# Dispatching Commands

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/dispatch.html

## Table of Contents

- [Dispatch Command for CUDA PTX Kernels](#cudadispatch)
- [Dispatch_Command_for_CUDA_PTX_Kernels](#cudadispatch)
- [Passing Dispatch Parameters and Arguments](#cudadispatch_info)
- [Passing_Dispatch_Parameters_and_Arguments](#cudadispatch_info)
- [Resource Sharing from Vulkan to the CUDA Kernel](#cudadispatch_sharing_resources)
- [Resource_Sharing_from_Vulkan_to_the_CUDA_Kernel](#cudadispatch_sharing_resources)
- [Compute Occupancy Priority](#compute-occupancy-priority)
- [Compute_Occupancy_Priority](#compute-occupancy-priority)

## Content

The *dispatching commands* described in this chapter provoke work in a
compute pipeline.
Dispatching commands are recorded into a command buffer and when executed by
a queue, will produce work which executes according to the bound compute
pipeline.
A compute pipeline **must** be bound to a command buffer before any dispatching
commands are recorded in that command buffer.

To record a dispatch, call:

// Provided by VK_VERSION_1_0
void vkCmdDispatch(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    groupCountX,
    uint32_t                                    groupCountY,
    uint32_t                                    groupCountZ);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`groupCountX` is the number of local workgroups to dispatch in the X
dimension.

* 
`groupCountY` is the number of local workgroups to dispatch in the Y
dimension.

* 
`groupCountZ` is the number of local workgroups to dispatch in the Z
dimension.

When the command is executed, a global workgroup consisting of
`groupCountX` × `groupCountY` × `groupCountZ`
local workgroups is assembled.

Valid Usage

* 
[](#VUID-vkCmdDispatch-magFilter-04553) VUID-vkCmdDispatch-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatch-magFilter-09598) VUID-vkCmdDispatch-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatch-mipmapMode-04770) VUID-vkCmdDispatch-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatch-mipmapMode-09599) VUID-vkCmdDispatch-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatch-unnormalizedCoordinates-09635) VUID-vkCmdDispatch-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDispatch-None-08609) VUID-vkCmdDispatch-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatch-None-08610) VUID-vkCmdDispatch-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDispatch-None-08611) VUID-vkCmdDispatch-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDispatch-None-06479) VUID-vkCmdDispatch-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-None-02691) VUID-vkCmdDispatch-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatch-None-07888) VUID-vkCmdDispatch-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatch-None-02692) VUID-vkCmdDispatch-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatch-None-02693) VUID-vkCmdDispatch-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatch-filterCubic-02694) VUID-vkCmdDispatch-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatch-filterCubicMinmax-02695) VUID-vkCmdDispatch-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatch-cubicRangeClamp-09212) VUID-vkCmdDispatch-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdDispatch-reductionMode-09213) VUID-vkCmdDispatch-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdDispatch-selectableCubicWeights-09214) VUID-vkCmdDispatch-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdDispatch-flags-02696) VUID-vkCmdDispatch-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdDispatch-OpTypeImage-07027) VUID-vkCmdDispatch-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-OpTypeImage-07028) VUID-vkCmdDispatch-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-OpTypeImage-07029) VUID-vkCmdDispatch-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-OpTypeImage-07030) VUID-vkCmdDispatch-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-None-08600) VUID-vkCmdDispatch-None-08600

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatch-None-08601) VUID-vkCmdDispatch-None-08601

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatch-None-10068) VUID-vkCmdDispatch-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDispatch-maintenance4-08602) VUID-vkCmdDispatch-maintenance4-08602

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatch-None-08114) VUID-vkCmdDispatch-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatch-imageLayout-00344) VUID-vkCmdDispatch-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDispatch-None-08115) VUID-vkCmdDispatch-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatch-None-08116) VUID-vkCmdDispatch-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatch-None-08604) VUID-vkCmdDispatch-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDispatch-None-08117) VUID-vkCmdDispatch-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatch-None-08119) VUID-vkCmdDispatch-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatch-None-08605) VUID-vkCmdDispatch-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDispatch-None-08606) VUID-vkCmdDispatch-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDispatch-None-08608) VUID-vkCmdDispatch-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDispatch-uniformBuffers-06935) VUID-vkCmdDispatch-uniformBuffers-06935

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatch-None-08612) VUID-vkCmdDispatch-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatch-storageBuffers-06936) VUID-vkCmdDispatch-storageBuffers-06936

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatch-None-08613) VUID-vkCmdDispatch-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatch-commandBuffer-02707) VUID-vkCmdDispatch-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDispatch-viewType-07752) VUID-vkCmdDispatch-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDispatch-format-07753) VUID-vkCmdDispatch-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDispatch-OpImageWrite-08795) VUID-vkCmdDispatch-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDispatch-OpImageWrite-08796) VUID-vkCmdDispatch-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDispatch-OpImageWrite-04469) VUID-vkCmdDispatch-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDispatch-SampledType-04470) VUID-vkCmdDispatch-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDispatch-SampledType-04471) VUID-vkCmdDispatch-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatch-SampledType-04472) VUID-vkCmdDispatch-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDispatch-SampledType-04473) VUID-vkCmdDispatch-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatch-sparseImageInt64Atomics-04474) VUID-vkCmdDispatch-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDispatch-sparseImageInt64Atomics-04475) VUID-vkCmdDispatch-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDispatch-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDispatch-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDispatch-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-OpImageBoxFilterQCOM-06973) VUID-vkCmdDispatch-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDispatch-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDispatch-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDispatch-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatch-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDispatch-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatch-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDispatch-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatch-OpImageBlockMatchWindow-09215) VUID-vkCmdDispatch-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatch-OpImageBlockMatchWindow-09216) VUID-vkCmdDispatch-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDispatch-OpImageBlockMatchWindow-09217) VUID-vkCmdDispatch-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatch-None-07288) VUID-vkCmdDispatch-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDispatch-None-09600) VUID-vkCmdDispatch-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDispatch-commandBuffer-10746) VUID-vkCmdDispatch-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDispatch-None-10678) VUID-vkCmdDispatch-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdDispatch-None-10679) VUID-vkCmdDispatch-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdDispatch-pDescription-09900) VUID-vkCmdDispatch-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdDispatch-dimensionCount-09905) VUID-vkCmdDispatch-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdDispatch-OpTypeTensorARM-09906) VUID-vkCmdDispatch-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdDispatch-None-11297) VUID-vkCmdDispatch-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdDispatch-None-11298) VUID-vkCmdDispatch-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdDispatch-None-11299) VUID-vkCmdDispatch-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdDispatch-None-11397) VUID-vkCmdDispatch-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdDispatch-None-11300) VUID-vkCmdDispatch-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDispatch-None-11301) VUID-vkCmdDispatch-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatch-None-11302) VUID-vkCmdDispatch-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatch-None-11304) VUID-vkCmdDispatch-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDispatch-None-11305) VUID-vkCmdDispatch-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatch-None-11306) VUID-vkCmdDispatch-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatch-None-11308) VUID-vkCmdDispatch-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDispatch-None-11309) VUID-vkCmdDispatch-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDispatch-None-11372) VUID-vkCmdDispatch-None-11372

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatch-None-11373) VUID-vkCmdDispatch-None-11373

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatch-None-11374) VUID-vkCmdDispatch-None-11374

If
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdDispatch-pBindInfo-11375) VUID-vkCmdDispatch-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDispatch-None-11376) VUID-vkCmdDispatch-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdDispatch-None-11398) VUID-vkCmdDispatch-None-11398

If a [bound shader](shaders.html#shaders-binding) was created with a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdDispatch-None-11437) VUID-vkCmdDispatch-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatch-None-11438) VUID-vkCmdDispatch-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatch-None-11441) VUID-vkCmdDispatch-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatch-None-11439) VUID-vkCmdDispatch-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatch-None-11442) VUID-vkCmdDispatch-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatch-None-11485) VUID-vkCmdDispatch-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdDispatch-index-11450) VUID-vkCmdDispatch-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDispatch-protectedNoFault-11455) VUID-vkCmdDispatch-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatch-protectedNoFault-11456) VUID-vkCmdDispatch-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatch-None-10672) VUID-vkCmdDispatch-None-10672

If the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model)
is not enabled,
this command **must** be called outside of a render pass instance

* 
[](#VUID-vkCmdDispatch-aspectMask-10673) VUID-vkCmdDispatch-aspectMask-10673

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, and if the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command writes to a variable of storage class
`Storage` `Class` `TileAttachmentQCOM`, the corresponding
[VkImageView](resources.html#VkImageView) using **must** not have been created with an
`aspectMask` that contains [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-vkCmdDispatch-None-10674) VUID-vkCmdDispatch-None-10674

If the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model)
is enabled, the
[tileShadingPerTileDispatch](features.html#features-tileShadingPerTileDispatch)
feature **must** be enabled

* 
[](#VUID-vkCmdDispatch-None-10675) VUID-vkCmdDispatch-None-10675

Memory backing image subresources used as
[tile attachments](renderpass.html#renderpass-tile-shading-attachment-access) in the
current render pass **must** not be written in any way other than as a tile
attachment by this command

* 
[](#VUID-vkCmdDispatch-None-10676) VUID-vkCmdDispatch-None-10676

If any recorded command in the current subpass will write to an image
subresource as a [tile    attachment](renderpass.html#renderpass-tile-shading-attachment-access), this command **must** not read from the memory backing that
image subresource in any other way than as a tile attachment

* 
[](#VUID-vkCmdDispatch-None-10743) VUID-vkCmdDispatch-None-10743

If there is no bound compute pipeline, a valid `VkShaderEXT` **must**
be bound to the [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) stage

* 
[](#VUID-vkCmdDispatch-commandBuffer-02712) VUID-vkCmdDispatch-commandBuffer-02712

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource written to by the `VkPipeline` object bound to the
pipeline bind point used by this command **must** not be an unprotected
resource

* 
[](#VUID-vkCmdDispatch-commandBuffer-02713) VUID-vkCmdDispatch-commandBuffer-02713

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
pipeline stages other than the framebuffer-space and compute stages in
the `VkPipeline` object bound to the pipeline bind point used by
this command **must** not write to any resource

* 
[](#VUID-vkCmdDispatch-commandBuffer-04617) VUID-vkCmdDispatch-commandBuffer-04617

If any of the shader stages of the `VkPipeline` bound to the
pipeline bind point used by this command uses the
[`RayQueryKHR`](../appendices/spirvenv.html#spirvenv-capabilities-table-RayQueryKHR)
capability, then `commandBuffer` **must** not be a protected command
buffer

* 
[](#VUID-vkCmdDispatch-groupCountX-00386) VUID-vkCmdDispatch-groupCountX-00386

`groupCountX` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]

* 
[](#VUID-vkCmdDispatch-groupCountY-00387) VUID-vkCmdDispatch-groupCountY-00387

`groupCountY` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]

* 
[](#VUID-vkCmdDispatch-groupCountZ-00388) VUID-vkCmdDispatch-groupCountZ-00388

`groupCountZ` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatch-commandBuffer-parameter) VUID-vkCmdDispatch-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDispatch-commandBuffer-recording) VUID-vkCmdDispatch-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatch-commandBuffer-cmdpool) VUID-vkCmdDispatch-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDispatch-suspended) VUID-vkCmdDispatch-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatch-videocoding) VUID-vkCmdDispatch-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdDispatch is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

`VkDispatchIndirect2InfoKHR` is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkDispatchIndirect2InfoKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceAddressRangeKHR     addressRange;
    VkAddressCommandFlagsKHR    addressFlags;
} VkDispatchIndirect2InfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressRange` is the [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) containing
dispatch parameters.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](fundamentals.html#VkAddressCommandFlagsKHR) value defining
the flags for the address range.

Valid Usage

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13097) VUID-VkDispatchIndirect2InfoKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13098) VUID-VkDispatchIndirect2InfoKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13099) VUID-VkDispatchIndirect2InfoKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressFlags-13100) VUID-VkDispatchIndirect2InfoKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13122) VUID-VkDispatchIndirect2InfoKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13123) VUID-VkDispatchIndirect2InfoKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressFlags-13101) VUID-VkDispatchIndirect2InfoKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13124) VUID-VkDispatchIndirect2InfoKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13125) VUID-VkDispatchIndirect2InfoKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13107) VUID-VkDispatchIndirect2InfoKHR-addressRange-13107

The buffer from which `addressRange` was queried **must** have been
created with [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag

* 
[](#VUID-VkDispatchIndirect2InfoKHR-protectedNoFault-13108) VUID-VkDispatchIndirect2InfoKHR-protectedNoFault-13108

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
the buffer from which `addressRange` was queried **must** not have been
created with [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13109) VUID-VkDispatchIndirect2InfoKHR-addressRange-13109

`addressRange.address` **must** be a multiple of 4

Valid Usage (Implicit)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-sType-sType) VUID-VkDispatchIndirect2InfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPATCH_INDIRECT_2_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-pNext-pNext) VUID-VkDispatchIndirect2InfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressFlags-parameter) VUID-VkDispatchIndirect2InfoKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](fundamentals.html#VkAddressCommandFlagBitsKHR) values

To record an indirect dispatching command, call:

// Provided by VK_KHR_device_address_commands
void vkCmdDispatchIndirect2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkDispatchIndirect2InfoKHR*           pInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pInfo` is a pointer to a [VkDispatchIndirect2InfoKHR](#VkDispatchIndirect2InfoKHR) structure
defining parameters of this command.

`vkCmdDispatchIndirect2KHR` behaves similarly to [vkCmdDispatch](#vkCmdDispatch)
except that the parameters are read by the device from an address range
during execution.

Valid Usage

* 
[](#VUID-vkCmdDispatchIndirect2KHR-magFilter-04553) VUID-vkCmdDispatchIndirect2KHR-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-magFilter-09598) VUID-vkCmdDispatchIndirect2KHR-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-mipmapMode-04770) VUID-vkCmdDispatchIndirect2KHR-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-mipmapMode-09599) VUID-vkCmdDispatchIndirect2KHR-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-unnormalizedCoordinates-09635) VUID-vkCmdDispatchIndirect2KHR-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08609) VUID-vkCmdDispatchIndirect2KHR-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08610) VUID-vkCmdDispatchIndirect2KHR-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08611) VUID-vkCmdDispatchIndirect2KHR-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-06479) VUID-vkCmdDispatchIndirect2KHR-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-02691) VUID-vkCmdDispatchIndirect2KHR-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-07888) VUID-vkCmdDispatchIndirect2KHR-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-02692) VUID-vkCmdDispatchIndirect2KHR-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-02693) VUID-vkCmdDispatchIndirect2KHR-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-filterCubic-02694) VUID-vkCmdDispatchIndirect2KHR-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-filterCubicMinmax-02695) VUID-vkCmdDispatchIndirect2KHR-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-cubicRangeClamp-09212) VUID-vkCmdDispatchIndirect2KHR-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-reductionMode-09213) VUID-vkCmdDispatchIndirect2KHR-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-selectableCubicWeights-09214) VUID-vkCmdDispatchIndirect2KHR-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-flags-02696) VUID-vkCmdDispatchIndirect2KHR-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpTypeImage-07027) VUID-vkCmdDispatchIndirect2KHR-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpTypeImage-07028) VUID-vkCmdDispatchIndirect2KHR-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpTypeImage-07029) VUID-vkCmdDispatchIndirect2KHR-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpTypeImage-07030) VUID-vkCmdDispatchIndirect2KHR-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08600) VUID-vkCmdDispatchIndirect2KHR-None-08600

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08601) VUID-vkCmdDispatchIndirect2KHR-None-08601

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-10068) VUID-vkCmdDispatchIndirect2KHR-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDispatchIndirect2KHR-maintenance4-08602) VUID-vkCmdDispatchIndirect2KHR-maintenance4-08602

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08114) VUID-vkCmdDispatchIndirect2KHR-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-imageLayout-00344) VUID-vkCmdDispatchIndirect2KHR-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08115) VUID-vkCmdDispatchIndirect2KHR-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08116) VUID-vkCmdDispatchIndirect2KHR-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08604) VUID-vkCmdDispatchIndirect2KHR-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08117) VUID-vkCmdDispatchIndirect2KHR-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08119) VUID-vkCmdDispatchIndirect2KHR-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08605) VUID-vkCmdDispatchIndirect2KHR-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08606) VUID-vkCmdDispatchIndirect2KHR-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08608) VUID-vkCmdDispatchIndirect2KHR-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDispatchIndirect2KHR-uniformBuffers-06935) VUID-vkCmdDispatchIndirect2KHR-uniformBuffers-06935

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08612) VUID-vkCmdDispatchIndirect2KHR-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchIndirect2KHR-storageBuffers-06936) VUID-vkCmdDispatchIndirect2KHR-storageBuffers-06936

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-08613) VUID-vkCmdDispatchIndirect2KHR-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchIndirect2KHR-commandBuffer-02707) VUID-vkCmdDispatchIndirect2KHR-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDispatchIndirect2KHR-viewType-07752) VUID-vkCmdDispatchIndirect2KHR-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-format-07753) VUID-vkCmdDispatchIndirect2KHR-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageWrite-08795) VUID-vkCmdDispatchIndirect2KHR-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageWrite-08796) VUID-vkCmdDispatchIndirect2KHR-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageWrite-04469) VUID-vkCmdDispatchIndirect2KHR-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDispatchIndirect2KHR-SampledType-04470) VUID-vkCmdDispatchIndirect2KHR-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDispatchIndirect2KHR-SampledType-04471) VUID-vkCmdDispatchIndirect2KHR-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchIndirect2KHR-SampledType-04472) VUID-vkCmdDispatchIndirect2KHR-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDispatchIndirect2KHR-SampledType-04473) VUID-vkCmdDispatchIndirect2KHR-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchIndirect2KHR-sparseImageInt64Atomics-04474) VUID-vkCmdDispatchIndirect2KHR-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDispatchIndirect2KHR-sparseImageInt64Atomics-04475) VUID-vkCmdDispatchIndirect2KHR-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDispatchIndirect2KHR-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDispatchIndirect2KHR-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageBoxFilterQCOM-06973) VUID-vkCmdDispatchIndirect2KHR-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDispatchIndirect2KHR-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDispatchIndirect2KHR-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchWindow-09215) VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchWindow-09216) VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchWindow-09217) VUID-vkCmdDispatchIndirect2KHR-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-07288) VUID-vkCmdDispatchIndirect2KHR-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-09600) VUID-vkCmdDispatchIndirect2KHR-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDispatchIndirect2KHR-commandBuffer-10746) VUID-vkCmdDispatchIndirect2KHR-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-10678) VUID-vkCmdDispatchIndirect2KHR-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-10679) VUID-vkCmdDispatchIndirect2KHR-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdDispatchIndirect2KHR-pDescription-09900) VUID-vkCmdDispatchIndirect2KHR-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdDispatchIndirect2KHR-dimensionCount-09905) VUID-vkCmdDispatchIndirect2KHR-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdDispatchIndirect2KHR-OpTypeTensorARM-09906) VUID-vkCmdDispatchIndirect2KHR-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11297) VUID-vkCmdDispatchIndirect2KHR-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11298) VUID-vkCmdDispatchIndirect2KHR-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11299) VUID-vkCmdDispatchIndirect2KHR-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11397) VUID-vkCmdDispatchIndirect2KHR-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11300) VUID-vkCmdDispatchIndirect2KHR-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11301) VUID-vkCmdDispatchIndirect2KHR-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11302) VUID-vkCmdDispatchIndirect2KHR-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11304) VUID-vkCmdDispatchIndirect2KHR-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11305) VUID-vkCmdDispatchIndirect2KHR-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11306) VUID-vkCmdDispatchIndirect2KHR-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11308) VUID-vkCmdDispatchIndirect2KHR-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11309) VUID-vkCmdDispatchIndirect2KHR-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11372) VUID-vkCmdDispatchIndirect2KHR-None-11372

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11373) VUID-vkCmdDispatchIndirect2KHR-None-11373

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11374) VUID-vkCmdDispatchIndirect2KHR-None-11374

If
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdDispatchIndirect2KHR-pBindInfo-11375) VUID-vkCmdDispatchIndirect2KHR-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11376) VUID-vkCmdDispatchIndirect2KHR-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11398) VUID-vkCmdDispatchIndirect2KHR-None-11398

If a [bound shader](shaders.html#shaders-binding) was created with a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11437) VUID-vkCmdDispatchIndirect2KHR-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11438) VUID-vkCmdDispatchIndirect2KHR-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11441) VUID-vkCmdDispatchIndirect2KHR-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11439) VUID-vkCmdDispatchIndirect2KHR-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11442) VUID-vkCmdDispatchIndirect2KHR-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-None-11485) VUID-vkCmdDispatchIndirect2KHR-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-index-11450) VUID-vkCmdDispatchIndirect2KHR-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDispatchIndirect2KHR-protectedNoFault-11455) VUID-vkCmdDispatchIndirect2KHR-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchIndirect2KHR-protectedNoFault-11456) VUID-vkCmdDispatchIndirect2KHR-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchIndirect2KHR-commandBuffer-13049) VUID-vkCmdDispatchIndirect2KHR-commandBuffer-13049

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdDispatchIndirect2KHR-pInfo-13050) VUID-vkCmdDispatchIndirect2KHR-pInfo-13050

`pInfo->addressRange.size` **must** be greater than or equal to
`sizeof`(VkDispatchIndirectCommand)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-commandBuffer-parameter) VUID-vkCmdDispatchIndirect2KHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDispatchIndirect2KHR-pInfo-parameter) VUID-vkCmdDispatchIndirect2KHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDispatchIndirect2InfoKHR](#VkDispatchIndirect2InfoKHR) structure

* 
[](#VUID-vkCmdDispatchIndirect2KHR-commandBuffer-recording) VUID-vkCmdDispatchIndirect2KHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchIndirect2KHR-commandBuffer-cmdpool) VUID-vkCmdDispatchIndirect2KHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDispatchIndirect2KHR-renderpass) VUID-vkCmdDispatchIndirect2KHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDispatchIndirect2KHR-suspended) VUID-vkCmdDispatchIndirect2KHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatchIndirect2KHR-videocoding) VUID-vkCmdDispatchIndirect2KHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdDispatchIndirect2KHR is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To record an indirect dispatching command, call:

// Provided by VK_VERSION_1_0
void vkCmdDispatchIndirect(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    buffer,
    VkDeviceSize                                offset);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`buffer` is the buffer containing dispatch parameters.

* 
`offset` is the byte offset into `buffer` where parameters
begin.

`vkCmdDispatchIndirect` behaves similarly to [vkCmdDispatch](#vkCmdDispatch) except
that the parameters are read by the device from a buffer during execution.
The parameters of the dispatch are encoded in a
[VkDispatchIndirectCommand](#VkDispatchIndirectCommand) structure taken from `buffer` starting
at `offset`.

Valid Usage

* 
[](#VUID-vkCmdDispatchIndirect-magFilter-04553) VUID-vkCmdDispatchIndirect-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-magFilter-09598) VUID-vkCmdDispatchIndirect-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-mipmapMode-04770) VUID-vkCmdDispatchIndirect-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-mipmapMode-09599) VUID-vkCmdDispatchIndirect-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-unnormalizedCoordinates-09635) VUID-vkCmdDispatchIndirect-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDispatchIndirect-None-08609) VUID-vkCmdDispatchIndirect-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchIndirect-None-08610) VUID-vkCmdDispatchIndirect-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDispatchIndirect-None-08611) VUID-vkCmdDispatchIndirect-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDispatchIndirect-None-06479) VUID-vkCmdDispatchIndirect-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-None-02691) VUID-vkCmdDispatchIndirect-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-None-07888) VUID-vkCmdDispatchIndirect-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-None-02692) VUID-vkCmdDispatchIndirect-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-None-02693) VUID-vkCmdDispatchIndirect-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchIndirect-filterCubic-02694) VUID-vkCmdDispatchIndirect-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchIndirect-filterCubicMinmax-02695) VUID-vkCmdDispatchIndirect-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchIndirect-cubicRangeClamp-09212) VUID-vkCmdDispatchIndirect-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdDispatchIndirect-reductionMode-09213) VUID-vkCmdDispatchIndirect-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdDispatchIndirect-selectableCubicWeights-09214) VUID-vkCmdDispatchIndirect-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdDispatchIndirect-flags-02696) VUID-vkCmdDispatchIndirect-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdDispatchIndirect-OpTypeImage-07027) VUID-vkCmdDispatchIndirect-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-OpTypeImage-07028) VUID-vkCmdDispatchIndirect-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-OpTypeImage-07029) VUID-vkCmdDispatchIndirect-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-OpTypeImage-07030) VUID-vkCmdDispatchIndirect-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-None-08600) VUID-vkCmdDispatchIndirect-None-08600

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatchIndirect-None-08601) VUID-vkCmdDispatchIndirect-None-08601

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchIndirect-None-10068) VUID-vkCmdDispatchIndirect-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDispatchIndirect-maintenance4-08602) VUID-vkCmdDispatchIndirect-maintenance4-08602

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchIndirect-None-08114) VUID-vkCmdDispatchIndirect-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-imageLayout-00344) VUID-vkCmdDispatchIndirect-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDispatchIndirect-None-08115) VUID-vkCmdDispatchIndirect-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-None-08116) VUID-vkCmdDispatchIndirect-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-None-08604) VUID-vkCmdDispatchIndirect-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDispatchIndirect-None-08117) VUID-vkCmdDispatchIndirect-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-None-08119) VUID-vkCmdDispatchIndirect-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchIndirect-None-08605) VUID-vkCmdDispatchIndirect-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDispatchIndirect-None-08606) VUID-vkCmdDispatchIndirect-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDispatchIndirect-None-08608) VUID-vkCmdDispatchIndirect-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDispatchIndirect-uniformBuffers-06935) VUID-vkCmdDispatchIndirect-uniformBuffers-06935

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchIndirect-None-08612) VUID-vkCmdDispatchIndirect-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchIndirect-storageBuffers-06936) VUID-vkCmdDispatchIndirect-storageBuffers-06936

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchIndirect-None-08613) VUID-vkCmdDispatchIndirect-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchIndirect-commandBuffer-02707) VUID-vkCmdDispatchIndirect-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDispatchIndirect-viewType-07752) VUID-vkCmdDispatchIndirect-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDispatchIndirect-format-07753) VUID-vkCmdDispatchIndirect-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDispatchIndirect-OpImageWrite-08795) VUID-vkCmdDispatchIndirect-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDispatchIndirect-OpImageWrite-08796) VUID-vkCmdDispatchIndirect-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDispatchIndirect-OpImageWrite-04469) VUID-vkCmdDispatchIndirect-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDispatchIndirect-SampledType-04470) VUID-vkCmdDispatchIndirect-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDispatchIndirect-SampledType-04471) VUID-vkCmdDispatchIndirect-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchIndirect-SampledType-04472) VUID-vkCmdDispatchIndirect-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDispatchIndirect-SampledType-04473) VUID-vkCmdDispatchIndirect-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchIndirect-sparseImageInt64Atomics-04474) VUID-vkCmdDispatchIndirect-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDispatchIndirect-sparseImageInt64Atomics-04475) VUID-vkCmdDispatchIndirect-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDispatchIndirect-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDispatchIndirect-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDispatchIndirect-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-OpImageBoxFilterQCOM-06973) VUID-vkCmdDispatchIndirect-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDispatchIndirect-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDispatchIndirect-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDispatchIndirect-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchIndirect-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDispatchIndirect-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDispatchIndirect-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-OpImageBlockMatchWindow-09215) VUID-vkCmdDispatchIndirect-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchIndirect-OpImageBlockMatchWindow-09216) VUID-vkCmdDispatchIndirect-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDispatchIndirect-OpImageBlockMatchWindow-09217) VUID-vkCmdDispatchIndirect-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchIndirect-None-07288) VUID-vkCmdDispatchIndirect-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDispatchIndirect-None-09600) VUID-vkCmdDispatchIndirect-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDispatchIndirect-commandBuffer-10746) VUID-vkCmdDispatchIndirect-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDispatchIndirect-None-10678) VUID-vkCmdDispatchIndirect-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-None-10679) VUID-vkCmdDispatchIndirect-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdDispatchIndirect-pDescription-09900) VUID-vkCmdDispatchIndirect-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdDispatchIndirect-dimensionCount-09905) VUID-vkCmdDispatchIndirect-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdDispatchIndirect-OpTypeTensorARM-09906) VUID-vkCmdDispatchIndirect-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdDispatchIndirect-None-11297) VUID-vkCmdDispatchIndirect-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchIndirect-None-11298) VUID-vkCmdDispatchIndirect-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchIndirect-None-11299) VUID-vkCmdDispatchIndirect-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchIndirect-None-11397) VUID-vkCmdDispatchIndirect-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchIndirect-None-11300) VUID-vkCmdDispatchIndirect-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDispatchIndirect-None-11301) VUID-vkCmdDispatchIndirect-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchIndirect-None-11302) VUID-vkCmdDispatchIndirect-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchIndirect-None-11304) VUID-vkCmdDispatchIndirect-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDispatchIndirect-None-11305) VUID-vkCmdDispatchIndirect-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchIndirect-None-11306) VUID-vkCmdDispatchIndirect-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchIndirect-None-11308) VUID-vkCmdDispatchIndirect-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDispatchIndirect-None-11309) VUID-vkCmdDispatchIndirect-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDispatchIndirect-None-11372) VUID-vkCmdDispatchIndirect-None-11372

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchIndirect-None-11373) VUID-vkCmdDispatchIndirect-None-11373

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchIndirect-None-11374) VUID-vkCmdDispatchIndirect-None-11374

If
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdDispatchIndirect-pBindInfo-11375) VUID-vkCmdDispatchIndirect-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDispatchIndirect-None-11376) VUID-vkCmdDispatchIndirect-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdDispatchIndirect-None-11398) VUID-vkCmdDispatchIndirect-None-11398

If a [bound shader](shaders.html#shaders-binding) was created with a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdDispatchIndirect-None-11437) VUID-vkCmdDispatchIndirect-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchIndirect-None-11438) VUID-vkCmdDispatchIndirect-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchIndirect-None-11441) VUID-vkCmdDispatchIndirect-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchIndirect-None-11439) VUID-vkCmdDispatchIndirect-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchIndirect-None-11442) VUID-vkCmdDispatchIndirect-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchIndirect-None-11485) VUID-vkCmdDispatchIndirect-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdDispatchIndirect-index-11450) VUID-vkCmdDispatchIndirect-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDispatchIndirect-protectedNoFault-11455) VUID-vkCmdDispatchIndirect-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchIndirect-protectedNoFault-11456) VUID-vkCmdDispatchIndirect-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchIndirect-None-10672) VUID-vkCmdDispatchIndirect-None-10672

If the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model)
is not enabled,
this command **must** be called outside of a render pass instance

* 
[](#VUID-vkCmdDispatchIndirect-aspectMask-10673) VUID-vkCmdDispatchIndirect-aspectMask-10673

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, and if the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command writes to a variable of storage class
`Storage` `Class` `TileAttachmentQCOM`, the corresponding
[VkImageView](resources.html#VkImageView) using **must** not have been created with an
`aspectMask` that contains [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-vkCmdDispatchIndirect-None-10674) VUID-vkCmdDispatchIndirect-None-10674

If the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model)
is enabled, the
[tileShadingPerTileDispatch](features.html#features-tileShadingPerTileDispatch)
feature **must** be enabled

* 
[](#VUID-vkCmdDispatchIndirect-None-10675) VUID-vkCmdDispatchIndirect-None-10675

Memory backing image subresources used as
[tile attachments](renderpass.html#renderpass-tile-shading-attachment-access) in the
current render pass **must** not be written in any way other than as a tile
attachment by this command

* 
[](#VUID-vkCmdDispatchIndirect-None-10676) VUID-vkCmdDispatchIndirect-None-10676

If any recorded command in the current subpass will write to an image
subresource as a [tile    attachment](renderpass.html#renderpass-tile-shading-attachment-access), this command **must** not read from the memory backing that
image subresource in any other way than as a tile attachment

* 
[](#VUID-vkCmdDispatchIndirect-None-10743) VUID-vkCmdDispatchIndirect-None-10743

If there is no bound compute pipeline, a valid `VkShaderEXT` **must**
be bound to the [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) stage

* 
[](#VUID-vkCmdDispatchIndirect-buffer-02708) VUID-vkCmdDispatchIndirect-buffer-02708

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdDispatchIndirect-buffer-02709) VUID-vkCmdDispatchIndirect-buffer-02709

`buffer` **must** have been created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchIndirect-offset-02710) VUID-vkCmdDispatchIndirect-offset-02710

`offset` **must** be a multiple of `4`

* 
[](#VUID-vkCmdDispatchIndirect-commandBuffer-02711) VUID-vkCmdDispatchIndirect-commandBuffer-02711

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdDispatchIndirect-offset-00407) VUID-vkCmdDispatchIndirect-offset-00407

The sum of `offset` and the size of `VkDispatchIndirectCommand`
**must** be less than or equal to the size of `buffer`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchIndirect-commandBuffer-parameter) VUID-vkCmdDispatchIndirect-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDispatchIndirect-buffer-parameter) VUID-vkCmdDispatchIndirect-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdDispatchIndirect-commandBuffer-recording) VUID-vkCmdDispatchIndirect-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchIndirect-commandBuffer-cmdpool) VUID-vkCmdDispatchIndirect-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDispatchIndirect-suspended) VUID-vkCmdDispatchIndirect-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatchIndirect-videocoding) VUID-vkCmdDispatchIndirect-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdDispatchIndirect-commonparent) VUID-vkCmdDispatchIndirect-commonparent

 Both of `buffer`, and `commandBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdDispatchIndirect is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkDispatchIndirectCommand` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDispatchIndirectCommand {
    uint32_t    x;
    uint32_t    y;
    uint32_t    z;
} VkDispatchIndirectCommand;

* 
`x` is the number of local workgroups to dispatch in the X
dimension.

* 
`y` is the number of local workgroups to dispatch in the Y
dimension.

* 
`z` is the number of local workgroups to dispatch in the Z
dimension.

The members of `VkDispatchIndirectCommand` have the same meaning as the
corresponding parameters of [vkCmdDispatch](#vkCmdDispatch).

Valid Usage

* 
[](#VUID-VkDispatchIndirectCommand-x-00417) VUID-VkDispatchIndirectCommand-x-00417

`x` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]

* 
[](#VUID-VkDispatchIndirectCommand-y-00418) VUID-VkDispatchIndirectCommand-y-00418

`y` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]

* 
[](#VUID-VkDispatchIndirectCommand-z-00419) VUID-VkDispatchIndirectCommand-z-00419

`z` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]

To record a dispatch using non-zero base values for the components of
`WorkgroupId`, call:

// Provided by VK_VERSION_1_1
void vkCmdDispatchBase(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    baseGroupX,
    uint32_t                                    baseGroupY,
    uint32_t                                    baseGroupZ,
    uint32_t                                    groupCountX,
    uint32_t                                    groupCountY,
    uint32_t                                    groupCountZ);

// Provided by VK_KHR_device_group
// Equivalent to vkCmdDispatchBase
void vkCmdDispatchBaseKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    baseGroupX,
    uint32_t                                    baseGroupY,
    uint32_t                                    baseGroupZ,
    uint32_t                                    groupCountX,
    uint32_t                                    groupCountY,
    uint32_t                                    groupCountZ);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`baseGroupX` is the start value for the X component of
`WorkgroupId`.

* 
`baseGroupY` is the start value for the Y component of
`WorkgroupId`.

* 
`baseGroupZ` is the start value for the Z component of
`WorkgroupId`.

* 
`groupCountX` is the number of local workgroups to dispatch in the X
dimension.

* 
`groupCountY` is the number of local workgroups to dispatch in the Y
dimension.

* 
`groupCountZ` is the number of local workgroups to dispatch in the Z
dimension.

When the command is executed, a global workgroup consisting of
`groupCountX` × `groupCountY` × `groupCountZ`
local workgroups is assembled, with `WorkgroupId` values ranging from
[`baseGroup*`, `baseGroup*` +  `groupCount*`) in each
component.
[vkCmdDispatch](#vkCmdDispatch) is equivalent to
`vkCmdDispatchBase(0,0,0,groupCountX,groupCountY,groupCountZ)`.

Valid Usage

* 
[](#VUID-vkCmdDispatchBase-magFilter-04553) VUID-vkCmdDispatchBase-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchBase-magFilter-09598) VUID-vkCmdDispatchBase-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchBase-mipmapMode-04770) VUID-vkCmdDispatchBase-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchBase-mipmapMode-09599) VUID-vkCmdDispatchBase-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchBase-unnormalizedCoordinates-09635) VUID-vkCmdDispatchBase-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDispatchBase-None-08609) VUID-vkCmdDispatchBase-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchBase-None-08610) VUID-vkCmdDispatchBase-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDispatchBase-None-08611) VUID-vkCmdDispatchBase-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDispatchBase-None-06479) VUID-vkCmdDispatchBase-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-None-02691) VUID-vkCmdDispatchBase-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchBase-None-07888) VUID-vkCmdDispatchBase-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchBase-None-02692) VUID-vkCmdDispatchBase-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchBase-None-02693) VUID-vkCmdDispatchBase-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchBase-filterCubic-02694) VUID-vkCmdDispatchBase-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchBase-filterCubicMinmax-02695) VUID-vkCmdDispatchBase-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchBase-cubicRangeClamp-09212) VUID-vkCmdDispatchBase-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdDispatchBase-reductionMode-09213) VUID-vkCmdDispatchBase-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdDispatchBase-selectableCubicWeights-09214) VUID-vkCmdDispatchBase-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdDispatchBase-flags-02696) VUID-vkCmdDispatchBase-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdDispatchBase-OpTypeImage-07027) VUID-vkCmdDispatchBase-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-OpTypeImage-07028) VUID-vkCmdDispatchBase-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-OpTypeImage-07029) VUID-vkCmdDispatchBase-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-OpTypeImage-07030) VUID-vkCmdDispatchBase-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-None-08600) VUID-vkCmdDispatchBase-None-08600

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatchBase-None-08601) VUID-vkCmdDispatchBase-None-08601

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchBase-None-10068) VUID-vkCmdDispatchBase-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDispatchBase-maintenance4-08602) VUID-vkCmdDispatchBase-maintenance4-08602

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchBase-None-08114) VUID-vkCmdDispatchBase-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchBase-imageLayout-00344) VUID-vkCmdDispatchBase-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDispatchBase-None-08115) VUID-vkCmdDispatchBase-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchBase-None-08116) VUID-vkCmdDispatchBase-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchBase-None-08604) VUID-vkCmdDispatchBase-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDispatchBase-None-08117) VUID-vkCmdDispatchBase-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchBase-None-08119) VUID-vkCmdDispatchBase-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchBase-None-08605) VUID-vkCmdDispatchBase-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDispatchBase-None-08606) VUID-vkCmdDispatchBase-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDispatchBase-None-08608) VUID-vkCmdDispatchBase-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDispatchBase-uniformBuffers-06935) VUID-vkCmdDispatchBase-uniformBuffers-06935

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchBase-None-08612) VUID-vkCmdDispatchBase-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchBase-storageBuffers-06936) VUID-vkCmdDispatchBase-storageBuffers-06936

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchBase-None-08613) VUID-vkCmdDispatchBase-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchBase-commandBuffer-02707) VUID-vkCmdDispatchBase-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDispatchBase-viewType-07752) VUID-vkCmdDispatchBase-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDispatchBase-format-07753) VUID-vkCmdDispatchBase-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDispatchBase-OpImageWrite-08795) VUID-vkCmdDispatchBase-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDispatchBase-OpImageWrite-08796) VUID-vkCmdDispatchBase-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDispatchBase-OpImageWrite-04469) VUID-vkCmdDispatchBase-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDispatchBase-SampledType-04470) VUID-vkCmdDispatchBase-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDispatchBase-SampledType-04471) VUID-vkCmdDispatchBase-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchBase-SampledType-04472) VUID-vkCmdDispatchBase-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDispatchBase-SampledType-04473) VUID-vkCmdDispatchBase-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchBase-sparseImageInt64Atomics-04474) VUID-vkCmdDispatchBase-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDispatchBase-sparseImageInt64Atomics-04475) VUID-vkCmdDispatchBase-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDispatchBase-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDispatchBase-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDispatchBase-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-OpImageBoxFilterQCOM-06973) VUID-vkCmdDispatchBase-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDispatchBase-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDispatchBase-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDispatchBase-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchBase-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDispatchBase-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchBase-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDispatchBase-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchBase-OpImageBlockMatchWindow-09215) VUID-vkCmdDispatchBase-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchBase-OpImageBlockMatchWindow-09216) VUID-vkCmdDispatchBase-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDispatchBase-OpImageBlockMatchWindow-09217) VUID-vkCmdDispatchBase-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchBase-None-07288) VUID-vkCmdDispatchBase-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDispatchBase-None-09600) VUID-vkCmdDispatchBase-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDispatchBase-commandBuffer-10746) VUID-vkCmdDispatchBase-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDispatchBase-None-10678) VUID-vkCmdDispatchBase-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdDispatchBase-None-10679) VUID-vkCmdDispatchBase-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdDispatchBase-pDescription-09900) VUID-vkCmdDispatchBase-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdDispatchBase-dimensionCount-09905) VUID-vkCmdDispatchBase-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdDispatchBase-OpTypeTensorARM-09906) VUID-vkCmdDispatchBase-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdDispatchBase-None-11297) VUID-vkCmdDispatchBase-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchBase-None-11298) VUID-vkCmdDispatchBase-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchBase-None-11299) VUID-vkCmdDispatchBase-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchBase-None-11397) VUID-vkCmdDispatchBase-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchBase-None-11300) VUID-vkCmdDispatchBase-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDispatchBase-None-11301) VUID-vkCmdDispatchBase-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchBase-None-11302) VUID-vkCmdDispatchBase-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchBase-None-11304) VUID-vkCmdDispatchBase-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDispatchBase-None-11305) VUID-vkCmdDispatchBase-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchBase-None-11306) VUID-vkCmdDispatchBase-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchBase-None-11308) VUID-vkCmdDispatchBase-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDispatchBase-None-11309) VUID-vkCmdDispatchBase-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDispatchBase-None-11372) VUID-vkCmdDispatchBase-None-11372

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchBase-None-11373) VUID-vkCmdDispatchBase-None-11373

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchBase-None-11374) VUID-vkCmdDispatchBase-None-11374

If
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdDispatchBase-pBindInfo-11375) VUID-vkCmdDispatchBase-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDispatchBase-None-11376) VUID-vkCmdDispatchBase-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdDispatchBase-None-11398) VUID-vkCmdDispatchBase-None-11398

If a [bound shader](shaders.html#shaders-binding) was created with a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdDispatchBase-None-11437) VUID-vkCmdDispatchBase-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchBase-None-11438) VUID-vkCmdDispatchBase-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchBase-None-11441) VUID-vkCmdDispatchBase-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchBase-None-11439) VUID-vkCmdDispatchBase-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchBase-None-11442) VUID-vkCmdDispatchBase-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchBase-None-11485) VUID-vkCmdDispatchBase-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdDispatchBase-index-11450) VUID-vkCmdDispatchBase-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDispatchBase-protectedNoFault-11455) VUID-vkCmdDispatchBase-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchBase-protectedNoFault-11456) VUID-vkCmdDispatchBase-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchBase-None-10672) VUID-vkCmdDispatchBase-None-10672

If the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model)
is not enabled,
this command **must** be called outside of a render pass instance

* 
[](#VUID-vkCmdDispatchBase-aspectMask-10673) VUID-vkCmdDispatchBase-aspectMask-10673

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, and if the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command writes to a variable of storage class
`Storage` `Class` `TileAttachmentQCOM`, the corresponding
[VkImageView](resources.html#VkImageView) using **must** not have been created with an
`aspectMask` that contains [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-vkCmdDispatchBase-None-10674) VUID-vkCmdDispatchBase-None-10674

If the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model)
is enabled, the
[tileShadingPerTileDispatch](features.html#features-tileShadingPerTileDispatch)
feature **must** be enabled

* 
[](#VUID-vkCmdDispatchBase-None-10675) VUID-vkCmdDispatchBase-None-10675

Memory backing image subresources used as
[tile attachments](renderpass.html#renderpass-tile-shading-attachment-access) in the
current render pass **must** not be written in any way other than as a tile
attachment by this command

* 
[](#VUID-vkCmdDispatchBase-None-10676) VUID-vkCmdDispatchBase-None-10676

If any recorded command in the current subpass will write to an image
subresource as a [tile    attachment](renderpass.html#renderpass-tile-shading-attachment-access), this command **must** not read from the memory backing that
image subresource in any other way than as a tile attachment

* 
[](#VUID-vkCmdDispatchBase-None-10743) VUID-vkCmdDispatchBase-None-10743

If there is no bound compute pipeline, a valid `VkShaderEXT` **must**
be bound to the [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) stage

* 
[](#VUID-vkCmdDispatchBase-commandBuffer-02712) VUID-vkCmdDispatchBase-commandBuffer-02712

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource written to by the `VkPipeline` object bound to the
pipeline bind point used by this command **must** not be an unprotected
resource

* 
[](#VUID-vkCmdDispatchBase-commandBuffer-02713) VUID-vkCmdDispatchBase-commandBuffer-02713

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
pipeline stages other than the framebuffer-space and compute stages in
the `VkPipeline` object bound to the pipeline bind point used by
this command **must** not write to any resource

* 
[](#VUID-vkCmdDispatchBase-commandBuffer-04617) VUID-vkCmdDispatchBase-commandBuffer-04617

If any of the shader stages of the `VkPipeline` bound to the
pipeline bind point used by this command uses the
[`RayQueryKHR`](../appendices/spirvenv.html#spirvenv-capabilities-table-RayQueryKHR)
capability, then `commandBuffer` **must** not be a protected command
buffer

* 
[](#VUID-vkCmdDispatchBase-baseGroupX-00421) VUID-vkCmdDispatchBase-baseGroupX-00421

`baseGroupX` **must** be less than
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]

* 
[](#VUID-vkCmdDispatchBase-baseGroupX-00422) VUID-vkCmdDispatchBase-baseGroupX-00422

`baseGroupY` **must** be less than
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]

* 
[](#VUID-vkCmdDispatchBase-baseGroupZ-00423) VUID-vkCmdDispatchBase-baseGroupZ-00423

`baseGroupZ` **must** be less than
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]

* 
[](#VUID-vkCmdDispatchBase-groupCountX-00424) VUID-vkCmdDispatchBase-groupCountX-00424

`groupCountX` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0] minus
`baseGroupX`

* 
[](#VUID-vkCmdDispatchBase-groupCountY-00425) VUID-vkCmdDispatchBase-groupCountY-00425

`groupCountY` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1] minus
`baseGroupY`

* 
[](#VUID-vkCmdDispatchBase-groupCountZ-00426) VUID-vkCmdDispatchBase-groupCountZ-00426

`groupCountZ` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2] minus
`baseGroupZ`

* 
[](#VUID-vkCmdDispatchBase-baseGroupX-00427) VUID-vkCmdDispatchBase-baseGroupX-00427

If any of `baseGroupX`, `baseGroupY`, or `baseGroupZ` are
not zero, then the bound compute pipeline **must** have been created with
the [VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](pipelines.html#VkPipelineCreateFlagBits) flag
or the bound compute shader object **must** have been created with the
[VK_SHADER_CREATE_DISPATCH_BASE_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchBase-commandBuffer-parameter) VUID-vkCmdDispatchBase-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDispatchBase-commandBuffer-recording) VUID-vkCmdDispatchBase-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchBase-commandBuffer-cmdpool) VUID-vkCmdDispatchBase-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDispatchBase-suspended) VUID-vkCmdDispatchBase-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatchBase-videocoding) VUID-vkCmdDispatchBase-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdDispatchBase is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To record an area-based dispatch, call:

// Provided by VK_QCOM_tile_shading
void vkCmdDispatchTileQCOM(
    VkCommandBuffer                             commandBuffer,
    const VkDispatchTileInfoQCOM*               pDispatchTileInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDispatchTileInfo` is a pointer to a [VkDispatchTileInfoQCOM](#VkDispatchTileInfoQCOM)
structure containing information about the area-based dispatch.

This command operates in the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model), invoking a separate dispatch for each *covered tile*.
The global workgroup count and local workgroup size of each dispatch are
defined by the implementation to efficiently iterate over a uniform grid of
pixel blocks within the area of its *active tile*.

Each shader invocation operates on a single pixel block and its size is
determined by the shader’s tiling rate, which **must** be defined by shaders
executed by this command.
The `TileShadingRateQCOM` execution mode operand defines the shader’s
tiling rate.
Its `x` and `y` **must** be a power of two and less than or equal to
the [maxTileShadingRate](limits.html#limits-maxTileShadingRate) limit.
Its `z` **must** be less than or equal to the active tile’s depth as
reported by [VK_QCOM_tile_properties](../appendices/extensions.html#VK_QCOM_tile_properties), and
[VkTilePropertiesQCOM](renderpass.html#VkTilePropertiesQCOM).tileSize.z %
`TileShadingRateQCOM`::`z` **must** equal `0`.

The start location of the shader invocation’s pixel block is
vec3(`TileOffsetQCOM`, 0) + (`GlobalInvocationId` *
`TileShadingRateQCOM`)

Shader invocations **can** perform tile attachment load/store operations at any
location within the *active tile*, but the most efficient access **may** be
limited to fragment locations within and local to the shader invocation’s
pixel block.

Valid Usage

* 
[](#VUID-vkCmdDispatchTileQCOM-magFilter-04553) VUID-vkCmdDispatchTileQCOM-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-magFilter-09598) VUID-vkCmdDispatchTileQCOM-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-mipmapMode-04770) VUID-vkCmdDispatchTileQCOM-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-mipmapMode-09599) VUID-vkCmdDispatchTileQCOM-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-unnormalizedCoordinates-09635) VUID-vkCmdDispatchTileQCOM-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08609) VUID-vkCmdDispatchTileQCOM-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08610) VUID-vkCmdDispatchTileQCOM-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08611) VUID-vkCmdDispatchTileQCOM-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDispatchTileQCOM-None-06479) VUID-vkCmdDispatchTileQCOM-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-02691) VUID-vkCmdDispatchTileQCOM-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-07888) VUID-vkCmdDispatchTileQCOM-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-02692) VUID-vkCmdDispatchTileQCOM-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-02693) VUID-vkCmdDispatchTileQCOM-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchTileQCOM-filterCubic-02694) VUID-vkCmdDispatchTileQCOM-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchTileQCOM-filterCubicMinmax-02695) VUID-vkCmdDispatchTileQCOM-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchTileQCOM-cubicRangeClamp-09212) VUID-vkCmdDispatchTileQCOM-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdDispatchTileQCOM-reductionMode-09213) VUID-vkCmdDispatchTileQCOM-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdDispatchTileQCOM-selectableCubicWeights-09214) VUID-vkCmdDispatchTileQCOM-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdDispatchTileQCOM-flags-02696) VUID-vkCmdDispatchTileQCOM-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeImage-07027) VUID-vkCmdDispatchTileQCOM-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeImage-07028) VUID-vkCmdDispatchTileQCOM-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeImage-07029) VUID-vkCmdDispatchTileQCOM-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeImage-07030) VUID-vkCmdDispatchTileQCOM-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08600) VUID-vkCmdDispatchTileQCOM-None-08600

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08601) VUID-vkCmdDispatchTileQCOM-None-08601

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10068) VUID-vkCmdDispatchTileQCOM-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDispatchTileQCOM-maintenance4-08602) VUID-vkCmdDispatchTileQCOM-maintenance4-08602

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08114) VUID-vkCmdDispatchTileQCOM-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-imageLayout-00344) VUID-vkCmdDispatchTileQCOM-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08115) VUID-vkCmdDispatchTileQCOM-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08116) VUID-vkCmdDispatchTileQCOM-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08604) VUID-vkCmdDispatchTileQCOM-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08117) VUID-vkCmdDispatchTileQCOM-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08119) VUID-vkCmdDispatchTileQCOM-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08605) VUID-vkCmdDispatchTileQCOM-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08606) VUID-vkCmdDispatchTileQCOM-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08608) VUID-vkCmdDispatchTileQCOM-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDispatchTileQCOM-uniformBuffers-06935) VUID-vkCmdDispatchTileQCOM-uniformBuffers-06935

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08612) VUID-vkCmdDispatchTileQCOM-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchTileQCOM-storageBuffers-06936) VUID-vkCmdDispatchTileQCOM-storageBuffers-06936

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08613) VUID-vkCmdDispatchTileQCOM-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-02707) VUID-vkCmdDispatchTileQCOM-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDispatchTileQCOM-viewType-07752) VUID-vkCmdDispatchTileQCOM-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDispatchTileQCOM-format-07753) VUID-vkCmdDispatchTileQCOM-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageWrite-08795) VUID-vkCmdDispatchTileQCOM-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageWrite-08796) VUID-vkCmdDispatchTileQCOM-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageWrite-04469) VUID-vkCmdDispatchTileQCOM-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDispatchTileQCOM-SampledType-04470) VUID-vkCmdDispatchTileQCOM-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDispatchTileQCOM-SampledType-04471) VUID-vkCmdDispatchTileQCOM-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchTileQCOM-SampledType-04472) VUID-vkCmdDispatchTileQCOM-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDispatchTileQCOM-SampledType-04473) VUID-vkCmdDispatchTileQCOM-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchTileQCOM-sparseImageInt64Atomics-04474) VUID-vkCmdDispatchTileQCOM-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDispatchTileQCOM-sparseImageInt64Atomics-04475) VUID-vkCmdDispatchTileQCOM-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBoxFilterQCOM-06973) VUID-vkCmdDispatchTileQCOM-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09215) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09216) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09217) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-07288) VUID-vkCmdDispatchTileQCOM-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-09600) VUID-vkCmdDispatchTileQCOM-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-10746) VUID-vkCmdDispatchTileQCOM-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10678) VUID-vkCmdDispatchTileQCOM-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10679) VUID-vkCmdDispatchTileQCOM-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdDispatchTileQCOM-pDescription-09900) VUID-vkCmdDispatchTileQCOM-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-dimensionCount-09905) VUID-vkCmdDispatchTileQCOM-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeTensorARM-09906) VUID-vkCmdDispatchTileQCOM-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11297) VUID-vkCmdDispatchTileQCOM-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11298) VUID-vkCmdDispatchTileQCOM-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11299) VUID-vkCmdDispatchTileQCOM-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11397) VUID-vkCmdDispatchTileQCOM-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11300) VUID-vkCmdDispatchTileQCOM-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11301) VUID-vkCmdDispatchTileQCOM-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11302) VUID-vkCmdDispatchTileQCOM-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11304) VUID-vkCmdDispatchTileQCOM-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11305) VUID-vkCmdDispatchTileQCOM-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11306) VUID-vkCmdDispatchTileQCOM-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11308) VUID-vkCmdDispatchTileQCOM-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11309) VUID-vkCmdDispatchTileQCOM-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11372) VUID-vkCmdDispatchTileQCOM-None-11372

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11373) VUID-vkCmdDispatchTileQCOM-None-11373

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11374) VUID-vkCmdDispatchTileQCOM-None-11374

If
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdDispatchTileQCOM-pBindInfo-11375) VUID-vkCmdDispatchTileQCOM-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11376) VUID-vkCmdDispatchTileQCOM-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11398) VUID-vkCmdDispatchTileQCOM-None-11398

If a [bound shader](shaders.html#shaders-binding) was created with a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11437) VUID-vkCmdDispatchTileQCOM-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11438) VUID-vkCmdDispatchTileQCOM-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11441) VUID-vkCmdDispatchTileQCOM-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11439) VUID-vkCmdDispatchTileQCOM-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11442) VUID-vkCmdDispatchTileQCOM-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11485) VUID-vkCmdDispatchTileQCOM-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdDispatchTileQCOM-index-11450) VUID-vkCmdDispatchTileQCOM-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDispatchTileQCOM-protectedNoFault-11455) VUID-vkCmdDispatchTileQCOM-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-protectedNoFault-11456) VUID-vkCmdDispatchTileQCOM-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10672) VUID-vkCmdDispatchTileQCOM-None-10672

If the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model)
is not enabled,
this command **must** be called outside of a render pass instance

* 
[](#VUID-vkCmdDispatchTileQCOM-aspectMask-10673) VUID-vkCmdDispatchTileQCOM-aspectMask-10673

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, and if the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command writes to a variable of storage class
`Storage` `Class` `TileAttachmentQCOM`, the corresponding
[VkImageView](resources.html#VkImageView) using **must** not have been created with an
`aspectMask` that contains [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10674) VUID-vkCmdDispatchTileQCOM-None-10674

If the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model)
is enabled, the
[tileShadingPerTileDispatch](features.html#features-tileShadingPerTileDispatch)
feature **must** be enabled

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10675) VUID-vkCmdDispatchTileQCOM-None-10675

Memory backing image subresources used as
[tile attachments](renderpass.html#renderpass-tile-shading-attachment-access) in the
current render pass **must** not be written in any way other than as a tile
attachment by this command

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10676) VUID-vkCmdDispatchTileQCOM-None-10676

If any recorded command in the current subpass will write to an image
subresource as a [tile    attachment](renderpass.html#renderpass-tile-shading-attachment-access), this command **must** not read from the memory backing that
image subresource in any other way than as a tile attachment

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10743) VUID-vkCmdDispatchTileQCOM-None-10743

If there is no bound compute pipeline, a valid `VkShaderEXT` **must**
be bound to the [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) stage

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-02712) VUID-vkCmdDispatchTileQCOM-commandBuffer-02712

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource written to by the `VkPipeline` object bound to the
pipeline bind point used by this command **must** not be an unprotected
resource

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-02713) VUID-vkCmdDispatchTileQCOM-commandBuffer-02713

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
pipeline stages other than the framebuffer-space and compute stages in
the `VkPipeline` object bound to the pipeline bind point used by
this command **must** not write to any resource

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-04617) VUID-vkCmdDispatchTileQCOM-commandBuffer-04617

If any of the shader stages of the `VkPipeline` bound to the
pipeline bind point used by this command uses the
[`RayQueryKHR`](../appendices/spirvenv.html#spirvenv-capabilities-table-RayQueryKHR)
capability, then `commandBuffer` **must** not be a protected command
buffer

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10668) VUID-vkCmdDispatchTileQCOM-None-10668

When this command is recorded
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) **must**
be enabled

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10669) VUID-vkCmdDispatchTileQCOM-None-10669

The [tileShadingDispatchTile](features.html#features-tileShadingDispatchTile) **must**
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-parameter) VUID-vkCmdDispatchTileQCOM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDispatchTileQCOM-pDispatchTileInfo-parameter) VUID-vkCmdDispatchTileQCOM-pDispatchTileInfo-parameter

 `pDispatchTileInfo` **must** be a valid pointer to a valid [VkDispatchTileInfoQCOM](#VkDispatchTileInfoQCOM) structure

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-recording) VUID-vkCmdDispatchTileQCOM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-cmdpool) VUID-vkCmdDispatchTileQCOM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDispatchTileQCOM-renderpass) VUID-vkCmdDispatchTileQCOM-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdDispatchTileQCOM-suspended) VUID-vkCmdDispatchTileQCOM-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatchTileQCOM-videocoding) VUID-vkCmdDispatchTileQCOM-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdDispatchTileQCOM is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkDispatchTileInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkDispatchTileInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
} VkDispatchTileInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDispatchTileInfoQCOM-sType-sType) VUID-VkDispatchTileInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPATCH_TILE_INFO_QCOM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDispatchTileInfoQCOM-pNext-pNext) VUID-VkDispatchTileInfoQCOM-pNext-pNext

 `pNext` **must** be `NULL`

A subpass shading dispatches a compute pipeline work with the work dimension
of render area of the calling subpass and work groups are partitioned by
specified work group size.
Subpass operations like `subpassLoad` are allowed to be used.

To record a subpass shading, call:

// Provided by VK_HUAWEI_subpass_shading
void vkCmdSubpassShadingHUAWEI(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

When the command is executed, a global workgroup consisting of ceil (render
area size / local workgroup size) local workgroups is assembled.

Valid Usage

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-magFilter-04553) VUID-vkCmdSubpassShadingHUAWEI-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-magFilter-09598) VUID-vkCmdSubpassShadingHUAWEI-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-mipmapMode-04770) VUID-vkCmdSubpassShadingHUAWEI-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-mipmapMode-09599) VUID-vkCmdSubpassShadingHUAWEI-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-unnormalizedCoordinates-09635) VUID-vkCmdSubpassShadingHUAWEI-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08609) VUID-vkCmdSubpassShadingHUAWEI-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08610) VUID-vkCmdSubpassShadingHUAWEI-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08611) VUID-vkCmdSubpassShadingHUAWEI-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-06479) VUID-vkCmdSubpassShadingHUAWEI-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-02691) VUID-vkCmdSubpassShadingHUAWEI-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-07888) VUID-vkCmdSubpassShadingHUAWEI-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-02692) VUID-vkCmdSubpassShadingHUAWEI-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-02693) VUID-vkCmdSubpassShadingHUAWEI-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-filterCubic-02694) VUID-vkCmdSubpassShadingHUAWEI-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-filterCubicMinmax-02695) VUID-vkCmdSubpassShadingHUAWEI-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-cubicRangeClamp-09212) VUID-vkCmdSubpassShadingHUAWEI-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-reductionMode-09213) VUID-vkCmdSubpassShadingHUAWEI-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-selectableCubicWeights-09214) VUID-vkCmdSubpassShadingHUAWEI-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-flags-02696) VUID-vkCmdSubpassShadingHUAWEI-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpTypeImage-07027) VUID-vkCmdSubpassShadingHUAWEI-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpTypeImage-07028) VUID-vkCmdSubpassShadingHUAWEI-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpTypeImage-07029) VUID-vkCmdSubpassShadingHUAWEI-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpTypeImage-07030) VUID-vkCmdSubpassShadingHUAWEI-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08600) VUID-vkCmdSubpassShadingHUAWEI-None-08600

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08601) VUID-vkCmdSubpassShadingHUAWEI-None-08601

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-10068) VUID-vkCmdSubpassShadingHUAWEI-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-maintenance4-08602) VUID-vkCmdSubpassShadingHUAWEI-maintenance4-08602

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08114) VUID-vkCmdSubpassShadingHUAWEI-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-imageLayout-00344) VUID-vkCmdSubpassShadingHUAWEI-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08115) VUID-vkCmdSubpassShadingHUAWEI-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08116) VUID-vkCmdSubpassShadingHUAWEI-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08604) VUID-vkCmdSubpassShadingHUAWEI-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08117) VUID-vkCmdSubpassShadingHUAWEI-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08119) VUID-vkCmdSubpassShadingHUAWEI-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08605) VUID-vkCmdSubpassShadingHUAWEI-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08606) VUID-vkCmdSubpassShadingHUAWEI-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08608) VUID-vkCmdSubpassShadingHUAWEI-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-uniformBuffers-06935) VUID-vkCmdSubpassShadingHUAWEI-uniformBuffers-06935

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08612) VUID-vkCmdSubpassShadingHUAWEI-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-storageBuffers-06936) VUID-vkCmdSubpassShadingHUAWEI-storageBuffers-06936

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-08613) VUID-vkCmdSubpassShadingHUAWEI-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-02707) VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-viewType-07752) VUID-vkCmdSubpassShadingHUAWEI-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-format-07753) VUID-vkCmdSubpassShadingHUAWEI-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageWrite-08795) VUID-vkCmdSubpassShadingHUAWEI-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageWrite-08796) VUID-vkCmdSubpassShadingHUAWEI-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageWrite-04469) VUID-vkCmdSubpassShadingHUAWEI-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-SampledType-04470) VUID-vkCmdSubpassShadingHUAWEI-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-SampledType-04471) VUID-vkCmdSubpassShadingHUAWEI-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-SampledType-04472) VUID-vkCmdSubpassShadingHUAWEI-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-SampledType-04473) VUID-vkCmdSubpassShadingHUAWEI-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-sparseImageInt64Atomics-04474) VUID-vkCmdSubpassShadingHUAWEI-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-sparseImageInt64Atomics-04475) VUID-vkCmdSubpassShadingHUAWEI-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageSampleWeightedQCOM-06971) VUID-vkCmdSubpassShadingHUAWEI-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageSampleWeightedQCOM-06972) VUID-vkCmdSubpassShadingHUAWEI-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageBoxFilterQCOM-06973) VUID-vkCmdSubpassShadingHUAWEI-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageSampleWeightedQCOM-06977) VUID-vkCmdSubpassShadingHUAWEI-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageSampleWeightedQCOM-06978) VUID-vkCmdSubpassShadingHUAWEI-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchWindow-09215) VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchWindow-09216) VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchWindow-09217) VUID-vkCmdSubpassShadingHUAWEI-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-07288) VUID-vkCmdSubpassShadingHUAWEI-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-09600) VUID-vkCmdSubpassShadingHUAWEI-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-10746) VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-10678) VUID-vkCmdSubpassShadingHUAWEI-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-10679) VUID-vkCmdSubpassShadingHUAWEI-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-pDescription-09900) VUID-vkCmdSubpassShadingHUAWEI-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-dimensionCount-09905) VUID-vkCmdSubpassShadingHUAWEI-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-OpTypeTensorARM-09906) VUID-vkCmdSubpassShadingHUAWEI-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11297) VUID-vkCmdSubpassShadingHUAWEI-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11298) VUID-vkCmdSubpassShadingHUAWEI-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11299) VUID-vkCmdSubpassShadingHUAWEI-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11397) VUID-vkCmdSubpassShadingHUAWEI-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11300) VUID-vkCmdSubpassShadingHUAWEI-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11301) VUID-vkCmdSubpassShadingHUAWEI-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11302) VUID-vkCmdSubpassShadingHUAWEI-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11304) VUID-vkCmdSubpassShadingHUAWEI-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11305) VUID-vkCmdSubpassShadingHUAWEI-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11306) VUID-vkCmdSubpassShadingHUAWEI-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11308) VUID-vkCmdSubpassShadingHUAWEI-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11309) VUID-vkCmdSubpassShadingHUAWEI-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11372) VUID-vkCmdSubpassShadingHUAWEI-None-11372

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11373) VUID-vkCmdSubpassShadingHUAWEI-None-11373

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11374) VUID-vkCmdSubpassShadingHUAWEI-None-11374

If
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-pBindInfo-11375) VUID-vkCmdSubpassShadingHUAWEI-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11376) VUID-vkCmdSubpassShadingHUAWEI-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11398) VUID-vkCmdSubpassShadingHUAWEI-None-11398

If a [bound shader](shaders.html#shaders-binding) was created with a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11437) VUID-vkCmdSubpassShadingHUAWEI-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11438) VUID-vkCmdSubpassShadingHUAWEI-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11441) VUID-vkCmdSubpassShadingHUAWEI-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11439) VUID-vkCmdSubpassShadingHUAWEI-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11442) VUID-vkCmdSubpassShadingHUAWEI-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-11485) VUID-vkCmdSubpassShadingHUAWEI-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-index-11450) VUID-vkCmdSubpassShadingHUAWEI-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-protectedNoFault-11455) VUID-vkCmdSubpassShadingHUAWEI-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-protectedNoFault-11456) VUID-vkCmdSubpassShadingHUAWEI-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-None-04931) VUID-vkCmdSubpassShadingHUAWEI-None-04931

This command **must** be called in a subpass with bind point
[VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](pipelines.html#VkPipelineBindPoint).
No draw commands can be called in the same subpass.
Only one [vkCmdSubpassShadingHUAWEI](#vkCmdSubpassShadingHUAWEI) command can be called in a
subpass

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-parameter) VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-recording) VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-cmdpool) VUID-vkCmdSubpassShadingHUAWEI-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-renderpass) VUID-vkCmdSubpassShadingHUAWEI-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-suspended) VUID-vkCmdSubpassShadingHUAWEI-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSubpassShadingHUAWEI-videocoding) VUID-vkCmdSubpassShadingHUAWEI-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdSubpassShadingHUAWEI is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Compute kernels **can** be provided in SPIR-V or PTX code.
When using PTX kernels the dispatch mechanism is different than with regular
compute pipelines.

The way to create a PTX assembly file is beyond the scope of this
documentation.
For mode information, please refer to the CUDA toolkit documentation at
[https://docs.nvidia.com/cuda/](https://docs.nvidia.com/cuda/).

Prior to using this command, you **must** initialize a CUDA module, and create
a function handle that will serve as the entry point of the kernel to
dispatch.
See [CUDA Modules](shaders.html#cuda-modules).

The dispatching of a CUDA kernel is recorded into a command buffer, and when
executed by a queue submit, will produce work which executes according to
the bound compute pipeline.

To record a CUDA kernel launch, call:

// Provided by VK_NV_cuda_kernel_launch
void vkCmdCudaLaunchKernelNV(
    VkCommandBuffer                             commandBuffer,
    const VkCudaLaunchInfoNV*                   pLaunchInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pLaunchInfo` is a pointer to a [VkCudaLaunchInfoNV](#VkCudaLaunchInfoNV) structure
in which the grid (similar to workgroup) dimension, function handle and
related arguments are defined.

When the command is executed, a global workgroup consisting of
`gridDimX` × `gridDimY` × `gridDimZ` local
workgroups is assembled.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCudaLaunchKernelNV-commandBuffer-parameter) VUID-vkCmdCudaLaunchKernelNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCudaLaunchKernelNV-pLaunchInfo-parameter) VUID-vkCmdCudaLaunchKernelNV-pLaunchInfo-parameter

 `pLaunchInfo` **must** be a valid pointer to a valid [VkCudaLaunchInfoNV](#VkCudaLaunchInfoNV) structure

* 
[](#VUID-vkCmdCudaLaunchKernelNV-commandBuffer-recording) VUID-vkCmdCudaLaunchKernelNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCudaLaunchKernelNV-commandBuffer-cmdpool) VUID-vkCmdCudaLaunchKernelNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdCudaLaunchKernelNV-suspended) VUID-vkCmdCudaLaunchKernelNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCudaLaunchKernelNV-videocoding) VUID-vkCmdCudaLaunchKernelNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdCudaLaunchKernelNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkCudaLaunchInfoNV` structure is very close to the parameters of
the CUDA-Driver function
[cuLaunchKernel](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__EXEC.html#group__CUDA__EXEC_1gb8f3dc3031b40da29d5f9a7139e52e15)
documented in section
[6.19
Execution Control](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__EXEC.html#group__CUDA__EXEC) of CUDA Driver API.

The structure is defined as:

// Provided by VK_NV_cuda_kernel_launch
typedef struct VkCudaLaunchInfoNV {
    VkStructureType        sType;
    const void*            pNext;
    VkCudaFunctionNV       function;
    uint32_t               gridDimX;
    uint32_t               gridDimY;
    uint32_t               gridDimZ;
    uint32_t               blockDimX;
    uint32_t               blockDimY;
    uint32_t               blockDimZ;
    uint32_t               sharedMemBytes;
    size_t                 paramCount;
    const void* const *    pParams;
    size_t                 extraCount;
    const void* const *    pExtras;
} VkCudaLaunchInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`function` is the CUDA-Driver handle to the function being launched.

* 
`gridDimX` is the number of local workgroups to dispatch in the X
dimension.
It **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]

* 
`gridDimY` is the number of local workgroups to dispatch in the Y
dimension.
It **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]

* 
`gridDimZ` is the number of local workgroups to dispatch in the Z
dimension.
It **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]

* 
`blockDimX` is block size in the X dimension.

* 
`blockDimY` is block size in the Y dimension.

* 
`blockDimZ` is block size in the Z dimension.

* 
`sharedMemBytes` is the dynamic shared-memory size per thread block
in bytes.

* 
`paramCount` is the length of the `pParams` table.

* 
`pParams` is a pointer to an array of `paramCount` pointers,
corresponding to the arguments of `function`.

* 
`extraCount` is reserved for future use.

* 
`pExtras` is reserved for future use.

Kernel parameters of `function` are specified via `pParams`, very
much the same way as described in
[cuLaunchKernel](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__EXEC.html#group__CUDA__EXEC_1gb8f3dc3031b40da29d5f9a7139e52e15)

If `function` has N parameters, then `pParams` **must** be an array of
N pointers and `paramCount` **must** be N. Each of `kernelParams`[0]
through `kernelParams`[N-1] **must** point to a region of memory from which
the actual kernel parameter will be copied.
The number of kernel parameters and their offsets and sizes are not
specified here as that information is stored in the [VkCudaFunctionNV](shaders.html#VkCudaFunctionNV)
object.

The application-owned memory pointed to by `pParams` and
`kernelParams`[0] through `kernelParams`[N-1] are consumed
immediately, and **may** be altered or freed after
[vkCmdCudaLaunchKernelNV](#vkCmdCudaLaunchKernelNV) has returned.

Valid Usage

* 
[](#VUID-VkCudaLaunchInfoNV-gridDimX-09406) VUID-VkCudaLaunchInfoNV-gridDimX-09406

`gridDimX` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]

* 
[](#VUID-VkCudaLaunchInfoNV-gridDimY-09407) VUID-VkCudaLaunchInfoNV-gridDimY-09407

`gridDimY` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]

* 
[](#VUID-VkCudaLaunchInfoNV-gridDimZ-09408) VUID-VkCudaLaunchInfoNV-gridDimZ-09408

`gridDimZ` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]

* 
[](#VUID-VkCudaLaunchInfoNV-paramCount-09409) VUID-VkCudaLaunchInfoNV-paramCount-09409

`paramCount` **must** be the total amount of parameters listed in the
`pParams` table

* 
[](#VUID-VkCudaLaunchInfoNV-pParams-09410) VUID-VkCudaLaunchInfoNV-pParams-09410

`pParams` **must** be a pointer to a table of `paramCount`
parameters, corresponding to the arguments of `function`

* 
[](#VUID-VkCudaLaunchInfoNV-extraCount-09411) VUID-VkCudaLaunchInfoNV-extraCount-09411

`extraCount` **must** be 0

* 
[](#VUID-VkCudaLaunchInfoNV-pExtras-09412) VUID-VkCudaLaunchInfoNV-pExtras-09412

`pExtras` **must** be NULL

Valid Usage (Implicit)

* 
[](#VUID-VkCudaLaunchInfoNV-sType-sType) VUID-VkCudaLaunchInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CUDA_LAUNCH_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCudaLaunchInfoNV-pNext-pNext) VUID-VkCudaLaunchInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCudaLaunchInfoNV-function-parameter) VUID-VkCudaLaunchInfoNV-function-parameter

 `function` **must** be a valid [VkCudaFunctionNV](shaders.html#VkCudaFunctionNV) handle

Given that one key limitation of this extension is that Vulkan **cannot**
access, nor bind any global resource of CUDA modules, the only way to
exchange data with the kernel **must** be to *pass resources via the arguments
of the function*.

You can use [VK_KHR_buffer_device_address](../appendices/extensions.html#VK_KHR_buffer_device_address) to write/read to/from a
[VkBuffer](resources.html#VkBuffer) object.
[VK_KHR_buffer_device_address](../appendices/extensions.html#VK_KHR_buffer_device_address) allows you to get the device address of
the buffer to pass it as an argument into `pParams`.
Application-side pointer arithmetic on the device address is legal, but will
not be bounds-checked on the device.

The corresponding argument of the CUDA function **should** be declared as a
pointer of the same type as the referenced buffer.
CUDA code **may** simply read or write to this buffer in the typical C way.

You **may** also use [VK_NVX_image_view_handle](../appendices/extensions.html#VK_NVX_image_view_handle) as another convenient way
to read/write from/to a [VkImage](resources.html#VkImage).

The corresponding argument of the CUDA function **must** be typed as
`cudaSurfaceObject_t`.

* 
You **may** read from it by using CUDA surface-read functions such as
`surf3Dread`, `surf2Dread`, and `surf1Dread`

* 
You **may** write to it by using CUDA surface-write functions such as
`surf3Dwrite`, `surf2Dwrite`, and `surf1Dwrite`

Please refer to CUDA
[surface
object](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html%23surface-object-api-appendix) documentation for more details

On Vulkan side, here is an example on how to setup
[VkImageViewHandleInfoNVX](resources.html#VkImageViewHandleInfoNVX) to query the handle for
`cudaSurfaceObject_t`:

VkImageViewHandleInfoNVX imageViewHandleInfo = {VK_STRUCTURE_TYPE_IMAGE_VIEW_HANDLE_INFO_NVX};
imageViewHandleInfo.sampler = VK_NULL_HANDLE;
imageViewHandleInfo.descriptorType = VK_DESCRIPTOR_TYPE_STORAGE_IMAGE;
imageViewHandleInfo.imageView = imageViewIn; // the VkImageView we want to access
uint32_t myViewHandleIn = vkGetImageViewHandleNVX(m_device, &imageViewHandleInfo);
imageViewHandleInfo.imageView = imageViewOut; // the VkImageView we want to access
uint32_t myViewHandleOut = vkGetImageViewHandleNVX(m_device, &imageViewHandleInfo);

Here is an example of how to declare parameters for `pParams`

VkCudaLaunchInfoNV launchInfo = { VK_STRUCTURE_TYPE_CUDA_LAUNCH_INFO_NV };

int block_size = 8;
float dt = 1.0f / 60.0f;

const void* params[] =
{
  &dt,
  &uint32_t myViewHandleIn,
  &uint32_t myViewHandleOut
};

launchInfo.function = cudaFunction; // CUDA function previously created
launchInfo.gridDimX = (volumeTexDimensionNonBoundary / block_size);
launchInfo.gridDimY = (volumeTexDimensionNonBoundary / block_size);
launchInfo.gridDimZ = (volumeTexDimensionNonBoundary / block_size);
launchInfo.blockDimX = block_size;
launchInfo.blockDimY = block_size;
launchInfo.blockDimZ = block_size;
launchInfo.sharedMemBytes = 0;
launchInfo.paramCount = 3;
launchInfo.pParams = &params[0];
launchInfo.extraCount = 0;
launchInfo.pExtras = nullptr;

vkCmdCudaLaunchKernelNV(commandBuffer, &launchInfo);

In the CUDA kernel source code, here is an example on how arguments match
`pParams` and how we can use Surface object:

extern "C"  __global__ void cudaFunction(
  float dt,
  cudaSurfaceObject_t volumeTexIn,
  cudaSurfaceObject_t volumeTexOut
  )
{
  int i = 1 + blockIdx.x * blockDim.x + threadIdx.x;
  int j = 1 + blockIdx.y * blockDim.y + threadIdx.y;
  int k = 1 + blockIdx.z * blockDim.z + threadIdx.z;

  float val;
  surf3Dread(&val, volumeTexIn, i * sizeof(float), j, k);
  ...
  float result = ...;
  // write result
  surf3Dwrite(result, volumeTexOut, i * sizeof(float), j, k);
}

The [VK_NV_compute_occupancy_priority](../appendices/extensions.html#VK_NV_compute_occupancy_priority) extension provides applications
with control over how their compute workloads utilize GPU compute resources,
specifically allowing prioritization relative to other simultaneously
executing workloads.
Applications can specify the priority with which compute workloads should
occupy GPU compute resources, allowing for a fine-grained distinction
between workloads that may want to execute at a background priority over a
long period of time versus workloads with harder latency requirements.

To set the compute occupancy priority for subsequent compute dispatches,
call:

// Provided by VK_NV_compute_occupancy_priority
void vkCmdSetComputeOccupancyPriorityNV(
    VkCommandBuffer                             commandBuffer,
    const VkComputeOccupancyPriorityParametersNV* pParameters);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pParameters` is a pointer to a
[VkComputeOccupancyPriorityParametersNV](#VkComputeOccupancyPriorityParametersNV) structure specifying the
occupancy priority parameters.

The occupancy priority affects how compute workloads utilize GPU compute
resources relative to other simultaneously executing workloads.
The priority is stateful on a command buffer.
All compute dispatch commands issued subsequent to a
[vkCmdSetComputeOccupancyPriorityNV](#vkCmdSetComputeOccupancyPriorityNV) call will be executed with the
specified priority parameters until another
[vkCmdSetComputeOccupancyPriorityNV](#vkCmdSetComputeOccupancyPriorityNV) call is made.

All command buffers (primary and secondary) start with a priority level
equal to the [VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV](#VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV) value.
The priority state is not inherited by secondary command buffers - each
command buffer maintains its own independent priority state.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-parameter) VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-pParameters-parameter) VUID-vkCmdSetComputeOccupancyPriorityNV-pParameters-parameter

 `pParameters` **must** be a valid pointer to a valid [VkComputeOccupancyPriorityParametersNV](#VkComputeOccupancyPriorityParametersNV) structure

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-recording) VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-cmdpool) VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-videocoding) VUID-vkCmdSetComputeOccupancyPriorityNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT | State |

Conditional Rendering

vkCmdSetComputeOccupancyPriorityNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkComputeOccupancyPriorityParametersNV` structure is defined as:

// Provided by VK_NV_compute_occupancy_priority
typedef struct VkComputeOccupancyPriorityParametersNV {
    VkStructureType    sType;
    const void*        pNext;
    float              occupancyPriority;
    float              occupancyThrottling;
} VkComputeOccupancyPriorityParametersNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`occupancyPriority` is a value specifying the occupancy priority for
subsequent compute workloads, with a valid range of [0.0, 1.0].
A value of 0.0 represents the lowest priority, while a value of 1.0 is
the maximum priority.
Default priority is specified by a value of 0.5.

* 
`occupancyThrottling` is a value specifying the level of occupancy
throttling applied to subsequent workloads, with a valid range of [0.0,
1.0].
A value of 0.0 (the default) means no throttling is applied, allowing
workloads to use the full available compute capacity.
Non-zero values represent increasing levels of throttling, with higher
values resulting in more restrictive occupancy limits.
A value of 1.0 represents the maximum level of throttling supported by
the implementation.

Valid Usage

* 
[](#VUID-VkComputeOccupancyPriorityParametersNV-occupancyPriority-12298) VUID-VkComputeOccupancyPriorityParametersNV-occupancyPriority-12298

`occupancyPriority` **must** be between `0` and `1`, inclusive

* 
[](#VUID-VkComputeOccupancyPriorityParametersNV-occupancyThrottling-12299) VUID-VkComputeOccupancyPriorityParametersNV-occupancyThrottling-12299

`occupancyThrottling` **must** be between `0` and `1`, inclusive

Valid Usage (Implicit)

* 
[](#VUID-VkComputeOccupancyPriorityParametersNV-sType-sType) VUID-VkComputeOccupancyPriorityParametersNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMPUTE_OCCUPANCY_PRIORITY_PARAMETERS_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkComputeOccupancyPriorityParametersNV-pNext-pNext) VUID-VkComputeOccupancyPriorityParametersNV-pNext-pNext

 `pNext` **must** be `NULL`

[VK_COMPUTE_OCCUPANCY_PRIORITY_LOW_NV](#VK_COMPUTE_OCCUPANCY_PRIORITY_LOW_NV) is a constant value that can be
used for
[VkComputeOccupancyPriorityParametersNV](#VkComputeOccupancyPriorityParametersNV)::`occupancyPriority` to
specify a low priority level.

#define VK_COMPUTE_OCCUPANCY_PRIORITY_LOW_NV 0.25f

[VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV](#VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV) is a constant value that can
be used for
[VkComputeOccupancyPriorityParametersNV](#VkComputeOccupancyPriorityParametersNV)::`occupancyPriority` to
specify a normal priority level.
This represents the default priority level.

#define VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV 0.50f

[VK_COMPUTE_OCCUPANCY_PRIORITY_HIGH_NV](#VK_COMPUTE_OCCUPANCY_PRIORITY_HIGH_NV) is a constant value that can be
used for
[VkComputeOccupancyPriorityParametersNV](#VkComputeOccupancyPriorityParametersNV)::`occupancyPriority` to
specify a high priority level.

#define VK_COMPUTE_OCCUPANCY_PRIORITY_HIGH_NV 0.75f
