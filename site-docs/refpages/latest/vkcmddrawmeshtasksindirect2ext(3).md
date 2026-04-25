# vkCmdDrawMeshTasksIndirect2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDrawMeshTasksIndirect2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDrawMeshTasksIndirect2EXT - Issue a mesh tasks draw with indirect parameters through an address range

To record an indirect mesh tasks drawing command, call:

// Provided by VK_KHR_device_address_commands with VK_EXT_mesh_shader
void vkCmdDrawMeshTasksIndirect2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkDrawIndirect2InfoKHR*               pInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pInfo` is a pointer to a [VkDrawIndirect2InfoKHR](VkDrawIndirect2InfoKHR.html) structure
defining parameters of this command.

`vkCmdDrawMeshTasksIndirect2EXT` behaves similarly to
[vkCmdDrawMeshTasksEXT](vkCmdDrawMeshTasksEXT.html) except that the parameters are read by the
device from an address range during execution.
`pInfo->drawCount` draws are executed by the command, with parameters
taken from `pInfo->addressRange` starting at `addressRange.address`
and increasing by `addressRange.stride` bytes for each successive draw.
The parameters of each draw are encoded in an array of
[VkDrawMeshTasksIndirectCommandEXT](VkDrawMeshTasksIndirectCommandEXT.html) structures.

Valid Usage

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-magFilter-04553) VUID-vkCmdDrawMeshTasksIndirect2EXT-magFilter-04553

If a [VkSampler](VkSampler.html) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](VkFilter.html),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html),
and `compareEnable` equal to [VK_FALSE](VK_FALSE.html) is used to sample a
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-magFilter-09598) VUID-vkCmdDrawMeshTasksIndirect2EXT-magFilter-09598

If a [VkSampler](VkSampler.html) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](VkFilter.html) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](VkSamplerReductionMode.html) or
[VK_SAMPLER_REDUCTION_MODE_MAX](VkSamplerReductionMode.html) is used to sample a
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-mipmapMode-04770) VUID-vkCmdDrawMeshTasksIndirect2EXT-mipmapMode-04770

If a [VkSampler](VkSampler.html) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](VkSamplerMipmapMode.html),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html),
and `compareEnable` equal to [VK_FALSE](VK_FALSE.html) is used to sample a
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-mipmapMode-09599) VUID-vkCmdDrawMeshTasksIndirect2EXT-mipmapMode-09599

If a [VkSampler](VkSampler.html) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](VkSamplerMipmapMode.html) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](VkSamplerReductionMode.html) or
[VK_SAMPLER_REDUCTION_MODE_MAX](VkSamplerReductionMode.html) is used to sample a
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-unnormalizedCoordinates-09635) VUID-vkCmdDrawMeshTasksIndirect2EXT-unnormalizedCoordinates-09635

If a [VkSampler](VkSampler.html) created with `unnormalizedCoordinates` equal to
[VK_TRUE](VK_TRUE.html) is used to sample a [VkImageView](VkImageView.html) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08609) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08609

If a [VkSampler](VkSampler.html) created with `unnormalizedCoordinates` equal to
[VK_TRUE](VK_TRUE.html) is used to sample a [VkImageView](VkImageView.html) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08610) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08610

If a [VkSampler](VkSampler.html) created with `unnormalizedCoordinates` equal to
[VK_TRUE](VK_TRUE.html) is used to sample a [VkImageView](VkImageView.html) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08611) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08611

If a [VkSampler](VkSampler.html) created with `unnormalizedCoordinates` equal to
[VK_TRUE](VK_TRUE.html) is used to sample a [VkImageView](VkImageView.html) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06479) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06479

If a [VkImageView](VkImageView.html) is sampled with
[depth comparison](../../../../spec/latest/chapters/textures.html#textures-depth-compare-operation), the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-02691) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-02691

If a [VkImageView](VkImageView.html) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07888) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-02692) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-02692

If a [VkImageView](VkImageView.html) is sampled with [VK_FILTER_CUBIC_EXT](VkFilter.html) as a
result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-02693) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-02693

If
the [VK_EXT_filter_cubic](VK_EXT_filter_cubic.html) extension is not enabled and
any [VkImageView](VkImageView.html) is sampled with [VK_FILTER_CUBIC_EXT](VkFilter.html) as a
result of this command, it **must** not have a [VkImageViewType](VkImageViewType.html) of
[VK_IMAGE_VIEW_TYPE_3D](VkImageViewType.html), [VK_IMAGE_VIEW_TYPE_CUBE](VkImageViewType.html), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](VkImageViewType.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-filterCubic-02694) VUID-vkCmdDrawMeshTasksIndirect2EXT-filterCubic-02694

Any [VkImageView](VkImageView.html) being sampled with [VK_FILTER_CUBIC_EXT](VkFilter.html) as a
result of this command **must** have a [VkImageViewType](VkImageViewType.html) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](VkFilterCubicImageViewImageFormatPropertiesEXT.html)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-filterCubicMinmax-02695) VUID-vkCmdDrawMeshTasksIndirect2EXT-filterCubicMinmax-02695

Any [VkImageView](VkImageView.html) being sampled with [VK_FILTER_CUBIC_EXT](VkFilter.html) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](VkSamplerReductionMode.html) or
[VK_SAMPLER_REDUCTION_MODE_MAX](VkSamplerReductionMode.html) as a result of this command **must**
have a [VkImageViewType](VkImageViewType.html) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](VkFilterCubicImageViewImageFormatPropertiesEXT.html)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-cubicRangeClamp-09212) VUID-vkCmdDrawMeshTasksIndirect2EXT-cubicRangeClamp-09212

If the [`cubicRangeClamp`](../../../../spec/latest/chapters/features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](VkImageView.html) being sampled with
[VK_FILTER_CUBIC_EXT](VkFilter.html) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](VkSamplerReductionMode.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-reductionMode-09213) VUID-vkCmdDrawMeshTasksIndirect2EXT-reductionMode-09213

Any [VkImageView](VkImageView.html) being sampled with a
[VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](VkSamplerReductionMode.html) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](VkFilter.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-selectableCubicWeights-09214) VUID-vkCmdDrawMeshTasksIndirect2EXT-selectableCubicWeights-09214

If the [`selectableCubicWeights`](../../../../spec/latest/chapters/features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](VkImageView.html) being sampled with
[VK_FILTER_CUBIC_EXT](VkFilter.html) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](VkSamplerCubicWeightsCreateInfoQCOM.html)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](VkCubicFilterWeightsQCOM.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-flags-02696) VUID-vkCmdDrawMeshTasksIndirect2EXT-flags-02696

Any [VkImage](VkImage.html) created with a [VkImageCreateInfo](VkImageCreateInfo.html)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](VkImageCreateFlagBits.html) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](VkSamplerAddressMode.html) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](VkSamplerAddressMode.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07027) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07027

For any [VkImageView](VkImageView.html) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07028) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07028

For any [VkImageView](VkImageView.html) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07029) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07029

For any [VkBufferView](VkBufferView.html) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](../../../../spec/latest/chapters/formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07030) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07030

Any [VkBufferView](VkBufferView.html) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](../../../../spec/latest/chapters/formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08600) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08600

If a [a bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding)
was created
as a [VkShaderEXT](VkShaderEXT.html) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](VkPipelineLayout.html) that is
compatible for set *n*, with the [VkPipelineLayout](VkPipelineLayout.html) used to create
the current [VkPipeline](VkPipeline.html)
or the [VkDescriptorSetLayout](VkDescriptorSetLayout.html) array used to create the current
[VkShaderEXT](VkShaderEXT.html)
, as described in [Pipeline Layout Compatibility](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08601) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08601

If a [a bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding)
was created
as a [VkShaderEXT](VkShaderEXT.html) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](VkPipelineLayout.html) that is
[compatible for push constants](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](VkPipelineLayout.html) used to create the current [VkPipeline](VkPipeline.html)
or the [VkDescriptorSetLayout](VkDescriptorSetLayout.html) array used to create the current
[VkShaderEXT](VkShaderEXT.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10068) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10068

For each array of resources that is used by [a bound    shader](../../../../spec/latest/chapters/shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-maintenance4-08602) VUID-vkCmdDrawMeshTasksIndirect2EXT-maintenance4-08602

If a [a bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding)
was created
as a [VkShaderEXT](VkShaderEXT.html) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](VkPipelineLayout.html) that is
[compatible for push constants](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](VkPipelineLayout.html) used to create the current [VkPipeline](VkPipeline.html)
or the [VkDescriptorSetLayout](VkDescriptorSetLayout.html) and [VkPushConstantRange](VkPushConstantRange.html) arrays
used to create the current [VkShaderEXT](VkShaderEXT.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08114) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), **must** be valid if they are accessed as
described by [descriptor validity](../../../../spec/latest/chapters/descriptorsets.html#descriptor-validity) by
the [VkPipeline](VkPipeline.html) bound to the pipeline bind point used by this
command and the bound [VkPipeline](VkPipeline.html) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-imageLayout-00344) VUID-vkCmdDrawMeshTasksIndirect2EXT-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](VkImageLayout.html)
**must** match the subresource accessible from the [VkImageView](VkImageView.html) as
defined by the [image layout    matching rules](../../../../spec/latest/chapters/resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08115) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08115

If the descriptors used by the [VkPipeline](VkPipeline.html) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), the bound
[VkPipeline](VkPipeline.html) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08116) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html), **must** be valid if they are
dynamically used by the [VkPipeline](VkPipeline.html) bound to the pipeline bind
point used by this command and the bound [VkPipeline](VkPipeline.html) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08604) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html), **must** be valid if they are
dynamically used by any [VkShaderEXT](VkShaderEXT.html) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08117) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08117

If the descriptors used by the [VkPipeline](VkPipeline.html) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html),
the bound [VkPipeline](VkPipeline.html) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08119) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08119

If a descriptor is dynamically used with a [VkPipeline](VkPipeline.html) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08605) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](VkShaderEXT.html) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08606) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08606

If the [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08608) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](VkPipeline.html) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-uniformBuffers-06935) VUID-vkCmdDrawMeshTasksIndirect2EXT-uniformBuffers-06935

If any stage of the [VkPipeline](VkPipeline.html) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](VkPipelineRobustnessBufferBehavior.html) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](VkPipelineRobustnessBufferBehavior.html) for
`uniformBuffers`,
and the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08612) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08612

If the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](VkShaderEXT.html) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-storageBuffers-06936) VUID-vkCmdDrawMeshTasksIndirect2EXT-storageBuffers-06936

If any stage of the [VkPipeline](VkPipeline.html) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](VkPipelineRobustnessBufferBehavior.html) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](VkPipelineRobustnessBufferBehavior.html) for
`storageBuffers`,
and the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08613) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08613

If the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](VkShaderEXT.html) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-02707) VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](../../../../spec/latest/chapters/shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewType-07752) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewType-07752

If a [VkImageView](VkImageView.html) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../../../../spec/latest/appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-format-07753) VUID-vkCmdDrawMeshTasksIndirect2EXT-format-07753

If a [VkImageView](VkImageView.html) or [VkBufferView](VkBufferView.html) is accessed as a result of
this command, then the [numeric type](../../../../spec/latest/chapters/formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageWrite-08795) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageWrite-08795

If a [VkImageView](VkImageView.html)
created with a format other than [VK_FORMAT_A8_UNORM](VkFormat.html)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageWrite-08796) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageWrite-08796

If a [VkImageView](VkImageView.html) created with the format [VK_FORMAT_A8_UNORM](VkFormat.html)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageWrite-04469) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageWrite-04469

If a [VkBufferView](VkBufferView.html) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-SampledType-04470) VUID-vkCmdDrawMeshTasksIndirect2EXT-SampledType-04470

If a [VkImageView](VkImageView.html) with a [VkFormat](VkFormat.html) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-SampledType-04471) VUID-vkCmdDrawMeshTasksIndirect2EXT-SampledType-04471

If a [VkImageView](VkImageView.html) with a [VkFormat](VkFormat.html) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-SampledType-04472) VUID-vkCmdDrawMeshTasksIndirect2EXT-SampledType-04472

If a [VkBufferView](VkBufferView.html) with a [VkFormat](VkFormat.html) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-SampledType-04473) VUID-vkCmdDrawMeshTasksIndirect2EXT-SampledType-04473

If a [VkBufferView](VkBufferView.html) with a [VkFormat](VkFormat.html) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sparseImageInt64Atomics-04474) VUID-vkCmdDrawMeshTasksIndirect2EXT-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](../../../../spec/latest/chapters/features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](VkImage.html)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sparseImageInt64Atomics-04475) VUID-vkCmdDrawMeshTasksIndirect2EXT-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](../../../../spec/latest/chapters/features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](VkBuffer.html)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](VkImageView.html)
as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](VkImageView.html) as a sample
weight image as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBoxFilterQCOM-06973) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](VkImageView.html) as a
result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](../../../../spec/latest/chapters/textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](VkSampler.html) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](VkSampler.html) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchWindow-09215) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchWindow-09216) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchWindow-09217) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](../../../../spec/latest/chapters/textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07288) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07288

Any shader invocation executed by this command **must**
[terminate](../../../../spec/latest/chapters/shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09600) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-10746) VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](../../../../spec/latest/chapters/memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10678) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10678

If this command is recorded inside a [tile    shading render pass](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html), [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10679) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10679

If this command is recorded where
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html) layout

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pDescription-09900) VUID-vkCmdDrawMeshTasksIndirect2EXT-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](VkTensorARM.html) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](VkTensorUsageFlagBitsARM.html)
usage flag set

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dimensionCount-09905) VUID-vkCmdDrawMeshTasksIndirect2EXT-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`pDescription` when creating the
underlying [VkTensorARM](VkTensorARM.html) object

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeTensorARM-09906) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../../../../spec/latest/appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](VkFormat.html) of the
[VkTensorViewARM](VkTensorViewARM.html) used for the access

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11297) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11298) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11299) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11397) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11300) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11301) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11302) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11304) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11305) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11306) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11308) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11308

For each [descriptor heap](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding), either directly or via a
[descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11309) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11309

If a [bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding) was created
as a [VkShaderEXT](VkShaderEXT.html) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11372) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11372

If any stage of the [VkPipeline](VkPipeline.html) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](VkPipelineRobustnessBufferBehavior.html) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](VkPipelineRobustnessBufferBehavior.html) for
`uniformBuffers`,
the [`robustBufferAccess2`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html)
when the descriptor was written

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11373) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11373

If any stage of the [VkPipeline](VkPipeline.html) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](VkPipelineRobustnessBufferBehavior.html) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](VkPipelineRobustnessBufferBehavior.html) for
`storageBuffers`,
the [`robustBufferAccess2`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html)
when the descriptor was written

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11374) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11374

If
the [`robustBufferAccess2`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](VkShaderEXT.html) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) when the descriptor was
written

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pBindInfo-11375) VUID-vkCmdDrawMeshTasksIndirect2EXT-pBindInfo-11375

If any [bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](vkCmdBindSamplerHeapEXT.html)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11376) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11376

If a [bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding) was created
as a [VkShaderEXT](VkShaderEXT.html) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](vkCmdPushDataEXT.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11398) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11398

If a [bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding) was created with a
[descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](VkDescriptorMappingSourceEXT.html), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](../../../../spec/latest/chapters/shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11437) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11438) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11441) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11439) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11442) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11485) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) object via
    [vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html)
or
    handle retrieved from a [VkAccelerationStructureNV](VkAccelerationStructureNV.html) object via
    [vkGetAccelerationStructureHandleNV](vkGetAccelerationStructureHandleNV.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-index-11450) VUID-vkCmdDrawMeshTasksIndirect2EXT-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](VkSamplerCustomBorderColorIndexCreateInfoEXT.html), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](VkSamplerCustomBorderColorIndexCreateInfoEXT.html)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-protectedNoFault-11455) VUID-vkCmdDrawMeshTasksIndirect2EXT-protectedNoFault-11455

If [`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html) create flag set

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-protectedNoFault-11456) VUID-vkCmdDrawMeshTasksIndirect2EXT-protectedNoFault-11456

If [`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html) create flag set

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-renderPass-02684) VUID-vkCmdDrawMeshTasksIndirect2EXT-renderPass-02684

The current render pass **must** be [compatible](../../../../spec/latest/chapters/renderpass.html#renderpass-compatibility)
with the `renderPass` member of the
`VkGraphicsPipelineCreateInfo` structure specified when creating the
`VkPipeline` bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-subpass-02685) VUID-vkCmdDrawMeshTasksIndirect2EXT-subpass-02685

The subpass index of the current render pass **must** be equal to the
`subpass` member of the `VkGraphicsPipelineCreateInfo` structure
specified when creating the `VkPipeline` bound to
[VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07468) VUID-vkCmdDrawMeshTasksIndirect2EXT-OpTypeImage-07468

If any shader executed by this pipeline accesses an `OpTypeImage`
variable with a `Dim` operand of `SubpassData`, it **must** be
decorated with an `InputAttachmentIndex` that corresponds to a valid
input attachment in the current subpass

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07469) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07469

Input attachment views accessed in a subpass **must** be created with the
same [VkFormat](VkFormat.html) as the corresponding subpass definition, and be
created with a [VkImageView](VkImageView.html) that is compatible with the attachment
referenced by the subpass'
`pInputAttachments`[`InputAttachmentIndex`] in the bound
[VkFramebuffer](VkFramebuffer.html) as specified by
[Fragment Input Attachment    Compatibility](../../../../spec/latest/chapters/interfaces.html#compatibility-inputattachment)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthInputAttachmentIndex-09595) VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthInputAttachmentIndex-09595

Input attachment views accessed in a dynamic render pass with a
`InputAttachmentIndex` referenced by
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html), or no
`InputAttachmentIndex` if
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)::`pDepthInputAttachmentIndex`
or
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)::`pStencilInputAttachmentIndex`
are `NULL`, **must** be created with a [VkImageView](VkImageView.html) that is compatible
with the corresponding color, depth, or stencil attachment in
[VkRenderingInfo](VkRenderingInfo.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthInputAttachmentIndex-09596) VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthInputAttachmentIndex-09596

Input attachment views accessed in a dynamic render pass via a shader
object **must** have an `InputAttachmentIndex` if both
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)::`pDepthInputAttachmentIndex`
and
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)::`pStencilInputAttachmentIndex`
are non-`NULL`

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-InputAttachmentIndex-09597) VUID-vkCmdDrawMeshTasksIndirect2EXT-InputAttachmentIndex-09597

If an input attachment view accessed in a dynamic render pass via a
shader object has an `InputAttachmentIndex`, the
`InputAttachmentIndex` **must** match an index in
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06537) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06537

Memory backing image subresources used as attachments in the current
render pass **must** not be written in any way other than as an attachment
by this command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10795) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10795

If a color attachment is written by any prior command in this subpass or
by the load, store, or resolve operations for this subpass,
and [feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) on that attachment,
it **must** not be accessed in any way other than as an attachment by this
command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10796) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10796

If a depth attachment is written by any prior command in this subpass or
by the load, store, or resolve operations for this subpass,
and [feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) on that attachment,
it **must** not be accessed in any way other than as an attachment by this
command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10797) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10797

If a stencil attachment is written by any prior command in this subpass
or by the load, store, or resolve operations for this subpass,
and [feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) on that attachment,
it **must** not be accessed in any way other than as an attachment by this
command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-12338) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-12338

If a color attachment is read in this command in any way other than as
an attachment, or has been read by any prior command in this subpass as
a non-attachment,
and [feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) on that attachment,
the color attachment **must** not be written to by this command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-12339) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-12339

If a depth attachment is read in this command in any way other than as
an attachment, or has been read by any prior command in this subpass as
a non-attachment,
and [feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) on that attachment,
the depth attachment **must** not be written to by this command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-12340) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-12340

If a stencil attachment is read in this command in any way other than as
an attachment, or has been read by any prior command in this subpass as
a non-attachment,
and [feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) on that attachment,
the stencil attachment **must** not be written to by this command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09003) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09003

If an attachment is written by any prior command in this subpass or by
the load, store, or resolve operations for this subpass, it **must** not be
accessed in any way other than as an attachment, storage image, or
sampled image by this command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06886) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06886

If the current render pass instance uses a depth/stencil attachment with
a read-only layout for the depth aspect, [depth    writes](../../../../spec/latest/chapters/fragops.html#fragops-depth-write) **must** be disabled

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06887) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06887

If the current render pass instance uses a depth/stencil attachment with
a read-only layout for the stencil aspect, both front and back
`writeMask` are not zero, and stencil test is enabled,
[all stencil ops](../../../../spec/latest/chapters/fragops.html#fragops-stencil) **must** be [VK_STENCIL_OP_KEEP](VkStencilOp.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07831) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07831

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT](VkDynamicState.html) dynamic state enabled then
[vkCmdSetViewport](vkCmdSetViewport.html) **must** have been called and not subsequently
[invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07832) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07832

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SCISSOR](VkDynamicState.html) dynamic state enabled then
[vkCmdSetScissor](vkCmdSetScissor.html) **must** have been called and not subsequently
[invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08617) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08617

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_WIDTH](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[effective rasterization input    topology](../../../../spec/latest/chapters/drawing.html#drawing-rasterization-input-topology) is in line topology class, then [vkCmdSetLineWidth](vkCmdSetLineWidth.html) **must**
have been called and not subsequently [    invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07834) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07834

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BIAS](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of `depthBiasEnable`
is [VK_TRUE](VK_TRUE.html), then [vkCmdSetDepthBias](vkCmdSetDepthBias.html)
or [vkCmdSetDepthBias2EXT](vkCmdSetDepthBias2EXT.html)
**must** have been called and not subsequently [    invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07835) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07835

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and an active color
attachment [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`blendEnable` is [VK_TRUE](VK_TRUE.html) with a blend equations where any
[VkBlendFactor](VkBlendFactor.html) member is [VK_BLEND_FACTOR_CONSTANT_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_CONSTANT_ALPHA](VkBlendFactor.html), or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](VkBlendFactor.html), then
[vkCmdSetBlendConstants](vkCmdSetBlendConstants.html) **must** have been called and not subsequently
[invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07836) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07836

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`depthBoundsTestEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetDepthBounds](vkCmdSetDepthBounds.html) **must** have been called and not subsequently
[invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07837) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07837

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_COMPARE_MASK](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetStencilCompareMask](vkCmdSetStencilCompareMask.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07838) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07838

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetStencilWriteMask](vkCmdSetStencilWriteMask.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07839) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07839

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_REFERENCE](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of and
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetStencilReference](vkCmdSetStencilReference.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-maxMultiviewInstanceIndex-02688) VUID-vkCmdDrawMeshTasksIndirect2EXT-maxMultiviewInstanceIndex-02688

If the draw is recorded in a render pass instance with multiview
enabled, the maximum instance index **must** be less than or equal to
[VkPhysicalDeviceMultiviewProperties](VkPhysicalDeviceMultiviewProperties.html)::`maxMultiviewInstanceIndex`

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-02689) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-02689

If the bound graphics pipeline was created with
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html)::`sampleLocationsEnable`
set to [VK_TRUE](VK_TRUE.html), then the active depth attachment **must** have been
created with the
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](VkImageCreateFlagBits.html) bit set

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07634) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07634

If the `[VK_EXT_sample_locations](VK_EXT_sample_locations.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](VkDynamicState.html) dynamic state
enabled, and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetSampleLocationsEnableEXT](vkCmdSetSampleLocationsEnableEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06666) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-06666

If the `[VK_EXT_sample_locations](VK_EXT_sample_locations.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetSampleLocationsEXT](vkCmdSetSampleLocationsEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07840) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07840

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_CULL_MODE](VkDynamicState.html) dynamic state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetCullMode](vkCmdSetCullMode.html) **must** have been called and not subsequently
[invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07841) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07841

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_FRONT_FACE](VkDynamicState.html) dynamic state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetFrontFace](vkCmdSetFrontFace.html) **must** have been called and not subsequently
[invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07843) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07843

 If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](VkDynamicState.html) dynamic state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html),
[vkCmdSetDepthTestEnable](vkCmdSetDepthTestEnable.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07844) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07844

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](VkDynamicState.html) dynamic state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of `depthTestEnable`
is [VK_TRUE](VK_TRUE.html), then [vkCmdSetDepthWriteEnable](vkCmdSetDepthWriteEnable.html) **must** have been
called and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07845) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07845

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of `depthTestEnable`
is [VK_TRUE](VK_TRUE.html), then [vkCmdSetDepthCompareOp](vkCmdSetDepthCompareOp.html) **must** have been
called and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07846) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07846

If the [`depthBounds`](../../../../spec/latest/chapters/features.html#features-depthBounds) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html) dynamic state enabled,
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetDepthBoundsTestEnable](vkCmdSetDepthBoundsTestEnable.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07847) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07847

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](VkDynamicState.html) dynamic state enabled, and
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetStencilTestEnable](vkCmdSetStencilTestEnable.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07848) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07848

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_OP](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](VK_TRUE.html), then [vkCmdSetStencilOp](vkCmdSetStencilOp.html)
**must** have been called and not subsequently [    invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-03417) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-03417

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) dynamic state enabled,
and the state is not inherited,
then [vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-scissorCount-03418) VUID-vkCmdDrawMeshTasksIndirect2EXT-scissorCount-03418

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html) dynamic state enabled,
and the state is not inherited,
then [vkCmdSetScissorWithCount](vkCmdSetScissorWithCount.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-03419) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-03419

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with both the
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html) and
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) dynamic states enabled,
and the state is not inherited,
then the `viewportCount` parameter of
`vkCmdSetViewportWithCount` **must** match the `scissorCount`
parameter of `vkCmdSetScissorWithCount`

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-04137) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-04137

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) dynamic state enabled, but
not the [VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](VkDynamicState.html) dynamic state
enabled, then the bound graphics pipeline **must** have been created with
[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-04138) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-04138

If the `[VK_NV_clip_space_w_scaling](VK_NV_clip_space_w_scaling.html)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) and
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`viewportWScalingEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetViewportWScalingNV](vkCmdSetViewportWScalingNV.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08636) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08636

If the `[VK_NV_clip_space_w_scaling](VK_NV_clip_space_w_scaling.html)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) and
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`viewportWScalingEnable` is [VK_TRUE](VK_TRUE.html), then the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWScalingNV](vkCmdSetViewportWScalingNV.html) **must** be greater than or equal to the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-04139) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-04139

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) dynamic state enabled, but
not the [VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](VkDynamicState.html) dynamic
state enabled, then the bound graphics pipeline **must** have been created
with
[VkPipelineViewportShadingRateImageStateCreateInfoNV](VkPipelineViewportShadingRateImageStateCreateInfoNV.html)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-shadingRateImage-09233) VUID-vkCmdDrawMeshTasksIndirect2EXT-shadingRateImage-09233

If the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV](VkDynamicState.html) and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetCoarseSampleOrderNV](vkCmdSetCoarseSampleOrderNV.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-shadingRateImage-09234) VUID-vkCmdDrawMeshTasksIndirect2EXT-shadingRateImage-09234

If the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) and
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](VkDynamicState.html) dynamic state
enabled, the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`shadingRateImageEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetViewportShadingRatePaletteNV](vkCmdSetViewportShadingRatePaletteNV.html) **must** have been called and
not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08637) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08637

If the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) and
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](VkDynamicState.html) dynamic state
enabled, the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`shadingRateImageEnable` is [VK_TRUE](VK_TRUE.html), then the
`viewportCount` parameter in the last call to
[vkCmdSetViewportShadingRatePaletteNV](vkCmdSetViewportShadingRatePaletteNV.html) **must** be greater than or
equal to the `viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-VkPipelineVieportCreateInfo-04141) VUID-vkCmdDrawMeshTasksIndirect2EXT-VkPipelineVieportCreateInfo-04141

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) dynamic state enabled and a
[VkPipelineViewportSwizzleStateCreateInfoNV](VkPipelineViewportSwizzleStateCreateInfoNV.html) structure chained from
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html), then the bound graphics
pipeline **must** have been created with
[VkPipelineViewportSwizzleStateCreateInfoNV](VkPipelineViewportSwizzleStateCreateInfoNV.html)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-VkPipelineVieportCreateInfo-04142) VUID-vkCmdDrawMeshTasksIndirect2EXT-VkPipelineVieportCreateInfo-04142

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) dynamic state enabled and a
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html) structure
chained from [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html), then the bound
graphics pipeline **must** have been created with
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html)::`exclusiveScissorCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07878) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07878

If the [`exclusiveScissor`](../../../../spec/latest/chapters/features.html#features-exclusiveScissor) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](VkDynamicState.html) dynamic state
enabled, then [vkCmdSetExclusiveScissorEnableNV](vkCmdSetExclusiveScissorEnableNV.html) **must** have been
called and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07879) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07879

If the [`exclusiveScissor`](../../../../spec/latest/chapters/features.html#features-exclusiveScissor) feature is
enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](VkDynamicState.html) dynamic state enabled, and
the most recent call to [vkCmdSetExclusiveScissorEnableNV](vkCmdSetExclusiveScissorEnableNV.html) in the
current command buffer set any element of `pExclusiveScissorEnables`
to [VK_TRUE](VK_TRUE.html), then [vkCmdSetExclusiveScissorNV](vkCmdSetExclusiveScissorNV.html) **must** have been
called and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-04876) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-04876

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html) dynamic state enabled,
then [vkCmdSetRasterizerDiscardEnable](vkCmdSetRasterizerDiscardEnable.html) **must** have been called and
not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-04877) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-04877

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](VkDynamicState.html) dynamic state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetDepthBiasEnable](vkCmdSetDepthBiasEnable.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-logicOp-04878) VUID-vkCmdDrawMeshTasksIndirect2EXT-logicOp-04878

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of `logicOpEnable` is
[VK_TRUE](VK_TRUE.html), then [vkCmdSetLogicOpEXT](vkCmdSetLogicOpEXT.html) **must** have been called and
not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-primitiveFragmentShadingRateWithMultipleViewports-04552) VUID-vkCmdDrawMeshTasksIndirect2EXT-primitiveFragmentShadingRateWithMultipleViewports-04552

If the [    `primitiveFragmentShadingRateWithMultipleViewports`](../../../../spec/latest/chapters/limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, the bound graphics pipeline was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) dynamic state enabled, and
any of the shader stages of the bound graphics pipeline write to the
`PrimitiveShadingRateKHR` built-in, then
[vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html) **must** have been called in the current
command buffer prior to this drawing command, and the
`viewportCount` parameter of `vkCmdSetViewportWithCount` **must**
be `1`

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-primitiveFragmentShadingRateWithMultipleViewports-08642) VUID-vkCmdDrawMeshTasksIndirect2EXT-primitiveFragmentShadingRateWithMultipleViewports-08642

If the [    `primitiveFragmentShadingRateWithMultipleViewports`](../../../../spec/latest/chapters/limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, and any shader object bound to a graphics stage writes to the
`PrimitiveShadingRateKHR` built-in, then
[vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html) **must** have been called in the current
command buffer prior to this drawing command, and the
`viewportCount` parameter of `vkCmdSetViewportWithCount` **must**
be `1`

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-blendEnable-04727) VUID-vkCmdDrawMeshTasksIndirect2EXT-blendEnable-04727

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then for each color
attachment, if the corresponding image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) do not contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](VkFormatFeatureFlagBits.html), then the
corresponding [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`blendEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08644) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08644

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound, the [current    value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html),
and none of the following is enabled:

the `[VK_AMD_mixed_attachment_samples](VK_AMD_mixed_attachment_samples.html)` extension

* 
the `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension

* 
the [     `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature

then the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizationSamples` **must** be the same as the current color and/or
depth/stencil attachments

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08876) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08876

If a shader object is bound to any graphics stage, the current render
pass instance **must** have been begun with [vkCmdBeginRendering](vkCmdBeginRendering.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06172) VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06172

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `imageView` member of
`pDepthAttachment` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the `layout`
member of `pDepthAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), this command
**must** not write any values to the depth attachment

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06173) VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06173

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `imageView` member of
`pStencilAttachment` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the
`layout` member of `pStencilAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), this command
**must** not write any values to the stencil attachment

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06174) VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06174

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `imageView` member of
`pDepthAttachment` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the `layout`
member of `pDepthAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), this
command **must** not write any values to the depth attachment

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06175) VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06175

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `imageView` member of
`pStencilAttachment` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the
`layout` member of `pStencilAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), this
command **must** not write any values to the stencil attachment

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06176) VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06176

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `imageView` member of
`pDepthAttachment` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the `layout`
member of `pDepthAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html), this command **must** not
write any values to the depth attachment

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06177) VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06177

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `imageView` member of
`pStencilAttachment` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the
`layout` member of `pStencilAttachment` is
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), this command **must** not
write any values to the stencil attachment

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewMask-06178) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewMask-06178

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the bound graphics pipeline **must** have been
created with a [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` equal
to [VkRenderingInfo](VkRenderingInfo.html)::`viewMask`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-06179) VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-06179

If
the [    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled and
the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the bound graphics pipeline **must** have been
created with a
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount` equal to
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08910) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08910

If
the [    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array
with an `imageView` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have
been created with a [VkFormat](VkFormat.html) equal to the corresponding element of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats` used
to create the bound graphics pipeline

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08912) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08912

If
the [    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array
with an `imageView` equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have the
corresponding element of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats` used
to create the bound pipeline equal to [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08911) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08911

If the [    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is enabled, and the
current render pass instance was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html)
and [VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` greater than `0`,
then each element of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments`
array with an `imageView` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must**
have been created with a [VkFormat](VkFormat.html) equal to the corresponding
element of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats` used
to create the bound graphics pipeline, or the corresponding element of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats`, if
it exists, **must** be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-09362) VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-09362

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), with a
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` equal to `1`,
there is no shader object bound to any graphics stage,
and a color attachment with a resolve mode of
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html), each
element of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array with
a `resolveImageView` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have
been created with an image created with a
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` value equal to the
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` value used to create
the bound graphics pipeline

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09363) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09363

If
there is no shader object bound to any graphics stage,
the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and a
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` equal to `1`, and a
color attachment with a resolve mode of
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html), each
element of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array with
a `imageView` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have been
created with an image created with a
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` value equal to the
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` value used to create
the bound graphics pipeline

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09364) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09364

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html) dynamic state enabled,
then [vkCmdSetColorBlendEnableEXT](vkCmdSetColorBlendEnableEXT.html) **must** have set the blend enable
to [VK_FALSE](VK_FALSE.html) prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09365) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09365

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) dynamic state enabled,
then [vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html) **must** have set
`rasterizationSamples` to [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) prior to this
drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09366) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09366

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html) resolve
mode, then [vkCmdSetColorBlendEnableEXT](vkCmdSetColorBlendEnableEXT.html) **must** have set blend enable
to [VK_FALSE](VK_FALSE.html) prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizationSamples-09367) VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizationSamples-09367

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html) resolve
mode, then [vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html) **must** have set
`rasterizationSamples` to [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) prior to this
drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09368) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09368

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) dynamic state enabled,
then [vkCmdSetFragmentShadingRateKHR](vkCmdSetFragmentShadingRateKHR.html) **must** have set
`pFragmentSize->width` to `1` prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09369) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09369

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) dynamic state enabled,
then [vkCmdSetFragmentShadingRateKHR](vkCmdSetFragmentShadingRateKHR.html) **must** have set
`pFragmentSize->height` to `1` prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pFragmentSize-09370) VUID-vkCmdDrawMeshTasksIndirect2EXT-pFragmentSize-09370

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html) resolve
mode, then [vkCmdSetFragmentShadingRateKHR](vkCmdSetFragmentShadingRateKHR.html) **must** have set
`pFragmentSize->width` to `1` prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pFragmentSize-09371) VUID-vkCmdDrawMeshTasksIndirect2EXT-pFragmentSize-09371

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html) resolve
mode, then [vkCmdSetFragmentShadingRateKHR](vkCmdSetFragmentShadingRateKHR.html) **must** have set
`pFragmentSize->height` to `1` prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07749) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07749

If the [`colorWriteEnable`](../../../../spec/latest/chapters/features.html#features-colorWriteEnable) feature is
enabled,
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](VkDynamicState.html) dynamic state enabled, and
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetColorWriteEnableEXT](vkCmdSetColorWriteEnableEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-attachmentCount-07750) VUID-vkCmdDrawMeshTasksIndirect2EXT-attachmentCount-07750

If the [`colorWriteEnable`](../../../../spec/latest/chapters/features.html#features-colorWriteEnable) feature is
enabled,
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](VkDynamicState.html) dynamic state enabled, and
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then the
`attachmentCount` parameter of most recent call to
`vkCmdSetColorWriteEnableEXT` in the current command buffer **must** be
greater than or equal to the number of active color attachments

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07751) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07751

If the `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)` extension is enabled, a
graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html) dynamic state enabled and
the `pNext` chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) included a
[VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html) structure, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`discardRectangleEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetDiscardRectangleEXT](vkCmdSetDiscardRectangleEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for each discard rectangle
in
[VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html)::`discardRectangleCount`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizerDiscardEnable-09236) VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizerDiscardEnable-09236

If the `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html) dynamic state enabled and
the `pNext` chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) did not
include a [VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html) structure,
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`discardRectangleEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetDiscardRectangleEXT](vkCmdSetDiscardRectangleEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for each discard rectangle
in
[VkPhysicalDeviceDiscardRectanglePropertiesEXT](VkPhysicalDeviceDiscardRectanglePropertiesEXT.html)::`maxDiscardRectangles`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07880) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07880

If the `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html) dynamic state
enabled, the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetDiscardRectangleEnableEXT](vkCmdSetDiscardRectangleEnableEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07881) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07881

If the `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](VkDynamicState.html) dynamic state enabled,
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`discardRectangleEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetDiscardRectangleModeEXT](vkCmdSetDiscardRectangleModeEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08913) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08913

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
the
[`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` was
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08914) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08914

If current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
the
[`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to the [VkFormat](VkFormat.html)
used to create [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08915) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08915

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the
[    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the value of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` used to
create the bound graphics pipeline was not equal to the [VkFormat](VkFormat.html)
used to create [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView`,
the value of the format **must** be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08916) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08916

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
the
[`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView` was
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08917) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08917

If current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
the
[`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to the
[VkFormat](VkFormat.html) used to create
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08918) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-08918

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the
[    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the value of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` used
to create the bound graphics pipeline was not equal to the
[VkFormat](VkFormat.html) used to create
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView`, the value of
the format **must** be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06183) VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06183

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html)::`imageView`
was not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the bound graphics pipeline **must** have
been created with
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineCreateFlagBits.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingLocalRead-11797) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingLocalRead-11797

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the
[`dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead)
feature is enabled, the
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](VkRenderingFlagBits.html) flag is
specified, and an attachment is being used as a feedback loop as
specified by
[](../../../../spec/latest/chapters/renderpass.html#rendering-attachment-input-attachment-feedback)[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html),
[VkRenderingAttachmentFlagsInfoKHR](VkRenderingAttachmentFlagsInfoKHR.html)::`flags` for that attachment
**must** include
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06184) VUID-vkCmdDrawMeshTasksIndirect2EXT-imageView-06184

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html)::`imageView`
was not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the bound graphics pipeline **must** have
been created with
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](VkPipelineCreateFlagBits.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-layers-10831) VUID-vkCmdDrawMeshTasksIndirect2EXT-layers-10831

If the current render pass instance was created with
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkRenderingFlagBits.html) or
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkRenderPassCreateFlagBits.html), and
the bound graphics pipeline was created with
[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkPipelineCreateFlagBits2.html), then
the current render pass instance **must** have a `layers` value less
than or equal to
[VkPipelineFragmentDensityMapLayeredCreateInfoVALVE](VkPipelineFragmentDensityMapLayeredCreateInfoVALVE.html)::`maxFragmentDensityMapLayers`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-06185) VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-06185

If the bound pipeline was created with a
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure, and the current render
pass instance was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html) with a
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` parameter greater than
`0`, then each element of the
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array with a
`imageView` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have been
created with a sample count equal to the corresponding element of the
`pColorAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) used to create the bound graphics
pipeline

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthAttachment-06186) VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthAttachment-06186

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the bound pipeline was created with a
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure, and
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of the
`depthStencilAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) used to create the bound graphics
pipeline **must** be equal to the sample count used to create
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pStencilAttachment-06187) VUID-vkCmdDrawMeshTasksIndirect2EXT-pStencilAttachment-06187

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the bound pipeline was created with a
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure, and
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of the
`depthStencilAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) used to create the bound graphics
pipeline **must** be equal to the sample count used to create
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-multisampledRenderToSingleSampled-07285) VUID-vkCmdDrawMeshTasksIndirect2EXT-multisampledRenderToSingleSampled-07285

    If
    the bound pipeline was created without a
    [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html)
or
    [VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html)
    structure, and
    the [    `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature is not enabled, and
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been recorded in the render pass instance, and
    the current render pass instance was begun with
    [vkCmdBeginRendering](vkCmdBeginRendering.html) with a
    [VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` parameter greater than
    `0`, then each element of the
    [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array with a
    `imageView` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have been
    created with a sample count equal to the value of
    `rasterizationSamples` for the bound graphics pipeline

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-multisampledRenderToSingleSampled-07286) VUID-vkCmdDrawMeshTasksIndirect2EXT-multisampledRenderToSingleSampled-07286

    If
    the bound pipeline was created without a
    [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html)
or
    [VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html)
    structure, and
    the [    `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature is not enabled, and
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been recorded in the render pass instance, and
    [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` was not
    [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of `rasterizationSamples` for the
    bound graphics pipeline **must** be equal to the sample count used to
    create [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-multisampledRenderToSingleSampled-07287) VUID-vkCmdDrawMeshTasksIndirect2EXT-multisampledRenderToSingleSampled-07287

    If
    the bound pipeline was created without a
    [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html)
or
    [VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html)
    structure, and
    the [    `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature is not enabled, and
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been recorded in the render pass instance, and
    [VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView` was not
    [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of `rasterizationSamples` for the
    bound graphics pipeline **must** be equal to the sample count used to
    create [VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pNext-07935) VUID-vkCmdDrawMeshTasksIndirect2EXT-pNext-07935

If this command is called inside a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), and the `pNext` chain of
[VkRenderingInfo](VkRenderingInfo.html) includes a
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](VK_TRUE.html),
then the value of `rasterizationSamples` for the bound graphics
pipeline **must** be equal to
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html)::`rasterizationSamples`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-renderPass-06198) VUID-vkCmdDrawMeshTasksIndirect2EXT-renderPass-06198

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the bound pipeline **must** have been created
with a [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`renderPass` equal to
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pColorAttachments-08963) VUID-vkCmdDrawMeshTasksIndirect2EXT-pColorAttachments-08963

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been recorded in the render
pass instance,
there is a graphics pipeline bound with a fragment shader that
statically writes to a color attachment, the color write mask is not
zero, color writes are enabled, and the corresponding element of the
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments->imageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the corresponding element of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pColorAttachments-11539) VUID-vkCmdDrawMeshTasksIndirect2EXT-pColorAttachments-11539

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance, there is a graphics pipeline bound
with a fragment shader that statically writes to a color attachment, the
color write mask is not zero, color writes are enabled, and the
corresponding element of the
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments->resolveImageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the corresponding element of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`pColorAttachmentFormats` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthAttachment-08964) VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthAttachment-08964

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been recorded in the render
pass instance,
there is a graphics pipeline bound, depth test is enabled, and the
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` used to
create the pipeline **must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthAttachment-11540) VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthAttachment-11540

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance, there is a graphics pipeline
bound, depth test is enabled, and the
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`depthAttachmentFormat` used to
create the pipeline **must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pStencilAttachment-08965) VUID-vkCmdDrawMeshTasksIndirect2EXT-pStencilAttachment-08965

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html),
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been recorded in the render
pass instance,
there is a graphics pipeline bound, stencil test is enabled and the
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pStencilAttachment-11860) VUID-vkCmdDrawMeshTasksIndirect2EXT-pStencilAttachment-11860

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance, there is a graphics pipeline
bound, stencil test is enabled and the
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView` was
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`stencilAttachmentFormat` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-flags-10582) VUID-vkCmdDrawMeshTasksIndirect2EXT-flags-10582

If the current render pass instance was begun with a
[vkCmdBeginRendering](vkCmdBeginRendering.html) call in `commandBuffer`, its
[VkRenderingInfo](VkRenderingInfo.html)::`flags` parameter **must** not have
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](VkRenderingFlagBits.html) set
unless [VK_RENDERING_CONTENTS_INLINE_BIT_KHR](VkRenderingFlagBits.html) is also set

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-primitivesGeneratedQueryWithRasterizerDiscard-06708) VUID-vkCmdDrawMeshTasksIndirect2EXT-primitivesGeneratedQueryWithRasterizerDiscard-06708

If the [    `primitivesGeneratedQueryWithRasterizerDiscard`](../../../../spec/latest/chapters/features.html#features-primitivesGeneratedQueryWithRasterizerDiscard) feature is not
enabled and the [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](VkQueryType.html) query is
active, [rasterization discard](../../../../spec/latest/chapters/primsrast.html#primsrast-discard) **must** not be enabled

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-primitivesGeneratedQueryWithNonZeroStreams-06709) VUID-vkCmdDrawMeshTasksIndirect2EXT-primitivesGeneratedQueryWithNonZeroStreams-06709

If the [    `primitivesGeneratedQueryWithNonZeroStreams`](../../../../spec/latest/chapters/features.html#features-primitivesGeneratedQueryWithNonZeroStreams) feature is not
enabled and the [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](VkQueryType.html) query is
active, the bound graphics pipeline **must** not have been created with a
non-zero value in
`VkPipelineRasterizationStateStreamCreateInfoEXT`::`rasterizationStream`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07620) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07620

If the [`depthClamp`](../../../../spec/latest/chapters/features.html#features-depthClamp) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](VkDynamicState.html) dynamic state enabled, and
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetDepthClampEnableEXT](vkCmdSetDepthClampEnableEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07621) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07621

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](VkDynamicState.html) dynamic state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetPolygonModeEXT](vkCmdSetPolygonModeEXT.html) **must** have been called and not subsequently
[invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07622) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07622

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) dynamic state enabled,
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07623) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07623

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html) dynamic state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html) **must** have been called and not subsequently
[invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-alphaToCoverageEnable-08919) VUID-vkCmdDrawMeshTasksIndirect2EXT-alphaToCoverageEnable-08919

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](VkDynamicState.html) dynamic state
enabled, and `alphaToCoverageEnable` was [VK_TRUE](VK_TRUE.html) in the last
call to [vkCmdSetAlphaToCoverageEnableEXT](vkCmdSetAlphaToCoverageEnableEXT.html), then the
[Fragment Output Interface](../../../../spec/latest/chapters/interfaces.html#interfaces-fragmentoutput) **must** contain a
variable for the alpha `Component` word in `Location` 0 at
`Index` 0

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-alphaToCoverageEnable-08920) VUID-vkCmdDrawMeshTasksIndirect2EXT-alphaToCoverageEnable-08920

If a shader object is bound to any graphics stage, and the most recent
call to [vkCmdSetAlphaToCoverageEnableEXT](vkCmdSetAlphaToCoverageEnableEXT.html) in the current command
buffer set `alphaToCoverageEnable` to [VK_TRUE](VK_TRUE.html), then the
[Fragment Output Interface](../../../../spec/latest/chapters/interfaces.html#interfaces-fragmentoutput) **must** contain a
variable for the alpha `Component` word in `Location` 0 at
`Index` 0

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07624) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07624

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](VkDynamicState.html) dynamic state
enabled, and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetAlphaToCoverageEnableEXT](vkCmdSetAlphaToCoverageEnableEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07625) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07625

If the [`alphaToOne`](../../../../spec/latest/chapters/features.html#features-alphaToOne) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](VkDynamicState.html) dynamic state enabled,
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetAlphaToOneEnableEXT](vkCmdSetAlphaToOneEnableEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07626) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07626

If the [`logicOp`](../../../../spec/latest/chapters/features.html#features-logicOp) feature is enabled,
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](VkDynamicState.html) dynamic state enabled, and
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetLogicOpEnableEXT](vkCmdSetLogicOpEnableEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07627) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07627

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and there are color
attachments bound, then [vkCmdSetColorBlendEnableEXT](vkCmdSetColorBlendEnableEXT.html) **must** have
been called and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime)
in the current command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07629) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07629

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html) dynamic state enabled, the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and there are color
attachments bound, then [vkCmdSetColorWriteMaskEXT](vkCmdSetColorWriteMaskEXT.html) **must** have been
called and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07630) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07630

If the [`geometryStreams`](../../../../spec/latest/chapters/features.html#features-geometryStreams) feature is
enabled, and
a shader object is bound to the [VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with both a
[VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html) stage and the
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](VkDynamicState.html) dynamic state enabled,
then [vkCmdSetRasterizationStreamEXT](vkCmdSetRasterizationStreamEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07631) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07631

If the `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](VkDynamicState.html) dynamic state
enabled, and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetConservativeRasterizationModeEXT](vkCmdSetConservativeRasterizationModeEXT.html) **must** have been called
and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the
current command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07632) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07632

If the `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](VkDynamicState.html) dynamic
state enabled, the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`conservativeRasterizationMode` is
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](VkConservativeRasterizationModeEXT.html), then
[vkCmdSetExtraPrimitiveOverestimationSizeEXT](vkCmdSetExtraPrimitiveOverestimationSizeEXT.html) **must** have been called
and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the
current command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-conservativePointAndLineRasterization-07499) VUID-vkCmdDrawMeshTasksIndirect2EXT-conservativePointAndLineRasterization-07499

If the `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` extension is enabled,
[    `conservativePointAndLineRasterization`](../../../../spec/latest/chapters/limits.html#limits-conservativePointAndLineRasterization) is not supported,
a shader object is bound to any graphics stage or
a graphics pipeline is bound, the [current    value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[effective rasterization input    topology](../../../../spec/latest/chapters/drawing.html#drawing-rasterization-input-topology) is in line or point topology class, then the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`conservativeRasterizationMode` **must** be
[VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](VkConservativeRasterizationModeEXT.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07633) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07633

If the [`depthClipEnable`](../../../../spec/latest/chapters/features.html#features-depthClipEnable) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](VkDynamicState.html) dynamic state, then
[vkCmdSetDepthClipEnableEXT](vkCmdSetDepthClipEnableEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07636) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07636

If the `[VK_EXT_provoking_vertex](VK_EXT_provoking_vertex.html)` extension is enabled,
a shader object is bound to the [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](VkDynamicState.html) dynamic state enabled,
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetProvokingVertexModeEXT](vkCmdSetProvokingVertexModeEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08666) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08666

If any of the [    `stippledRectangularLines`](../../../../spec/latest/chapters/features.html#features-stippledRectangularLines), [    `stippledBresenhamLines`](../../../../spec/latest/chapters/features.html#features-stippledBresenhamLines) or [    `stippledSmoothLines`](../../../../spec/latest/chapters/features.html#features-stippledSmoothLines) features are enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](VkDynamicState.html) dynamic state
enabled, and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[effective rasterization input    topology](../../../../spec/latest/chapters/drawing.html#drawing-rasterization-input-topology) is in line topology class, then
[vkCmdSetLineRasterizationModeEXT](vkCmdSetLineRasterizationModeEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08669) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08669

If any of the [    `stippledRectangularLines`](../../../../spec/latest/chapters/features.html#features-stippledRectangularLines), [    `stippledBresenhamLines`](../../../../spec/latest/chapters/features.html#features-stippledBresenhamLines) or [    `stippledSmoothLines`](../../../../spec/latest/chapters/features.html#features-stippledSmoothLines) features are enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](VkDynamicState.html) dynamic state enabled,
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[effective rasterization input    topology](../../../../spec/latest/chapters/drawing.html#drawing-rasterization-input-topology) is in line topology class, then
[vkCmdSetLineStippleEnableEXT](vkCmdSetLineStippleEnableEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07849) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07849

    If any of the [    `stippledRectangularLines`](../../../../spec/latest/chapters/features.html#features-stippledRectangularLines), [    `stippledBresenhamLines`](../../../../spec/latest/chapters/features.html#features-stippledBresenhamLines) or [    `stippledSmoothLines`](../../../../spec/latest/chapters/features.html#features-stippledSmoothLines) features are enabled and
    a shader object is bound to any graphics stage, or
    a bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE](VkDynamicState.html)
    dynamic state enabled, the [current    value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
    [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
    `stippledLineEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetLineStipple](vkCmdSetLineStipple.html)
    **must** have been called and not subsequently [    invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
    command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10608) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10608

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](VkDynamicState.html) dynamic state
enabled, the [effective    rasterization input topology](../../../../spec/latest/chapters/drawing.html#drawing-rasterization-input-topology) is in line topology class, and the
current `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](VkLineRasterizationMode.html) or
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](VkLineRasterizationMode.html), then the current
`alphaToCoverageEnable`, `alphaToOneEnable` and
`sampleShadingEnable` states **must** all be [VK_FALSE](VK_FALSE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07639) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07639

If the [`depthClipControl`](../../../../spec/latest/chapters/features.html#features-depthClipControl) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](VkDynamicState.html) dynamic state
enabled, then [vkCmdSetDepthClipNegativeOneToOneEXT](vkCmdSetDepthClipNegativeOneToOneEXT.html) **must** have been
called and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09650) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09650

If the [`depthClampControl`](../../../../spec/latest/chapters/features.html#features-depthClampControl) feature
is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT](VkDynamicState.html) dynamic state enabled, and
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`depthClampEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetDepthClampRangeEXT](vkCmdSetDepthClampRangeEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07640) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07640

If the `[VK_NV_clip_space_w_scaling](VK_NV_clip_space_w_scaling.html)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](VkDynamicState.html) dynamic state
enabled, then [vkCmdSetViewportWScalingEnableNV](vkCmdSetViewportWScalingEnableNV.html) **must** have been
called and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07641) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07641

If the `[VK_NV_viewport_swizzle](VK_NV_viewport_swizzle.html)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](VkDynamicState.html) dynamic state enabled, then
[vkCmdSetViewportSwizzleNV](vkCmdSetViewportSwizzleNV.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07642) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07642

If the `[VK_NV_fragment_coverage_to_color](VK_NV_fragment_coverage_to_color.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](VkDynamicState.html) dynamic state
enabled, and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetCoverageToColorEnableNV](vkCmdSetCoverageToColorEnableNV.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07643) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07643

If the `[VK_NV_fragment_coverage_to_color](VK_NV_fragment_coverage_to_color.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV](VkDynamicState.html) dynamic state
enabled, the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`coverageToColorEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetCoverageToColorLocationNV](vkCmdSetCoverageToColorLocationNV.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07644) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07644

If the `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV](VkDynamicState.html) dynamic state
enabled, and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetCoverageModulationModeNV](vkCmdSetCoverageModulationModeNV.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07645) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07645

If the `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](VkDynamicState.html) dynamic state
enabled, the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`coverageModulationMode` is any value other than
[VK_COVERAGE_MODULATION_MODE_NONE_NV](VkCoverageModulationModeNV.html), then
[vkCmdSetCoverageModulationTableEnableNV](vkCmdSetCoverageModulationTableEnableNV.html) **must** have been called and
not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07646) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07646

If the `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](VkDynamicState.html) dynamic state
enabled, the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`coverageModulationTableEnable` is [VK_TRUE](VK_TRUE.html), then
[vkCmdSetCoverageModulationTableNV](vkCmdSetCoverageModulationTableNV.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07647) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07647

If the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature is
enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](VkDynamicState.html) dynamic state
enabled, and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetShadingRateImageEnableNV](vkCmdSetShadingRateImageEnableNV.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pipelineFragmentShadingRate-09238) VUID-vkCmdDrawMeshTasksIndirect2EXT-pipelineFragmentShadingRate-09238

If the [    `pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) dynamic state enabled,
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetFragmentShadingRateKHR](vkCmdSetFragmentShadingRateKHR.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07648) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07648

If the [    `representativeFragmentTest`](../../../../spec/latest/chapters/features.html#features-representativeFragmentTest) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](VkDynamicState.html) dynamic
state enabled, and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetRepresentativeFragmentTestEnableNV](vkCmdSetRepresentativeFragmentTestEnableNV.html) **must** have been called
and not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the
current command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07649) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07649

If the [`coverageReductionMode`](../../../../spec/latest/chapters/features.html#features-coverageReductionMode)
feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](VkDynamicState.html) dynamic state enabled,
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetCoverageReductionModeNV](vkCmdSetCoverageReductionModeNV.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizationSamples-07471) VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizationSamples-07471

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) state enabled, and the
current subpass does not use any color and/or depth/stencil attachments,
then the `rasterizationSamples` in the last call to
[vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html) **must** follow the rules for a
[zero-attachment subpass](../../../../spec/latest/chapters/renderpass.html#renderpass-noattachments)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-samples-07472) VUID-vkCmdDrawMeshTasksIndirect2EXT-samples-07472

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html) state enabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) state disabled, then
the `samples` parameter in the last call to
[vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html) **must** be greater or equal to the
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`rasterizationSamples`
parameter used to create the bound graphics pipeline

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-samples-07473) VUID-vkCmdDrawMeshTasksIndirect2EXT-samples-07473

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html) state and
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) states enabled, then
the `samples` parameter in the last call to
[vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html) **must** be greater or equal to the
`rasterizationSamples` parameter in the last call to
[vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09211) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09211

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) state enabled,
or a shader object is bound to any graphics stage,
and the current render pass instance includes a
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](VK_TRUE.html),
then the `rasterizationSamples` in the last call to
[vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html) **must** be the same as the
`rasterizationSamples` member of that structure

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-firstAttachment-07476) VUID-vkCmdDrawMeshTasksIndirect2EXT-firstAttachment-07476

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound was created with the
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html) dynamic states enabled,
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then the last call to
[vkCmdSetColorBlendEnableEXT](vkCmdSetColorBlendEnableEXT.html) in the current command buffer prior to
this drawing command **must** have set a value for all active color
attachments

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-firstAttachment-07478) VUID-vkCmdDrawMeshTasksIndirect2EXT-firstAttachment-07478

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound was created with the
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html) dynamic states enabled, and
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then the last call to
[vkCmdSetColorWriteMaskEXT](vkCmdSetColorWriteMaskEXT.html) in the current command buffer prior to
this drawing command **must** have set a value for all active color
attachments

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-advancedBlendMaxColorAttachments-07480) VUID-vkCmdDrawMeshTasksIndirect2EXT-advancedBlendMaxColorAttachments-07480

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound was created with the
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html) and
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html) dynamic states enabled,
the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), and an active color
attachment [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`blendEnable` is [VK_TRUE](VK_TRUE.html), then the number of active color
attachments **must** not exceed [    `advancedBlendMaxColorAttachments`](../../../../spec/latest/chapters/limits.html#limits-advancedBlendMaxColorAttachments)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10862) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10862

If a graphics pipeline is bound was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html)
, but not the [VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html)
dynamic state enabled, and the [current    value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetColorBlendEquationEXT](vkCmdSetColorBlendEquationEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for all active color
attachments with the `blendEnable` [    current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of [VK_TRUE](VK_TRUE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizerDiscardEnable-10863) VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizerDiscardEnable-10863

If a graphics pipeline is bound was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html), but not the
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html) dynamic state enabled,
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetColorBlendAdvancedEXT](vkCmdSetColorBlendAdvancedEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for all active color
attachments with the `blendEnable` [    current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of [VK_TRUE](VK_TRUE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10864) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10864

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html) and
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html) dynamic state enabled,
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
either [vkCmdSetColorBlendAdvancedEXT](vkCmdSetColorBlendAdvancedEXT.html) or
[vkCmdSetColorBlendEquationEXT](vkCmdSetColorBlendEquationEXT.html) **must** have been called and not
subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for all active color
attachments with the `blendEnable` [    current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of [VK_TRUE](VK_TRUE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-primitivesGeneratedQueryWithNonZeroStreams-07481) VUID-vkCmdDrawMeshTasksIndirect2EXT-primitivesGeneratedQueryWithNonZeroStreams-07481

If the [    `primitivesGeneratedQueryWithNonZeroStreams`](../../../../spec/latest/chapters/features.html#features-primitivesGeneratedQueryWithNonZeroStreams) feature is not
enabled and the [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](VkQueryType.html) query is
active, and the bound graphics pipeline was created with
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](VkDynamicState.html) state enabled, the last
call to [vkCmdSetRasterizationStreamEXT](vkCmdSetRasterizationStreamEXT.html) **must** have set the
`rasterizationStream` to zero

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsPerPixel-07482) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsPerPixel-07482

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) state enabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) state disabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](VK_TRUE.html), then the
`sampleLocationsPerPixel` member of `pSampleLocationsInfo` in
the last call to [vkCmdSetSampleLocationsEXT](vkCmdSetSampleLocationsEXT.html) **must** equal the
`rasterizationSamples` member of the
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) structure the bound graphics
pipeline has been created with

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsPerPixel-07483) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsPerPixel-07483

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) state enabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](VK_TRUE.html), then the
`sampleLocationsPerPixel` member of `pSampleLocationsInfo` in
the last call to [vkCmdSetSampleLocationsEXT](vkCmdSetSampleLocationsEXT.html) **must** equal the
`rasterizationSamples` parameter of the last call to
[vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07484) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07484

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html)
stage, or
the bound graphics pipeline was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](VkDynamicState.html) state enabled, and
`sampleLocationsEnable` was [VK_TRUE](VK_TRUE.html) in the last call to
[vkCmdSetSampleLocationsEnableEXT](vkCmdSetSampleLocationsEnableEXT.html) then the current active depth
attachment **must** have been created with the
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](VkImageCreateFlagBits.html) bit set

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07485) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07485

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html)
stage, or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) state enabled and the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](VkDynamicState.html) state enabled, and if
`sampleLocationsEnable` was [VK_TRUE](VK_TRUE.html) in the last call to
[vkCmdSetSampleLocationsEnableEXT](vkCmdSetSampleLocationsEnableEXT.html), then the
`sampleLocationsInfo.maxSampleLocationGridSize.width` in the last
call to [vkCmdSetSampleLocationsEXT](vkCmdSetSampleLocationsEXT.html) **must** evenly divide
[VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html)::`maxSampleLocationGridSize.width`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](vkGetPhysicalDeviceMultisamplePropertiesEXT.html) with a
`samples` parameter equaling `rasterizationSamples`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07486) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07486

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html)
stage, or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) state enabled and the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](VkDynamicState.html) state enabled, and if
`sampleLocationsEnable` was [VK_TRUE](VK_TRUE.html) in the last call to
[vkCmdSetSampleLocationsEnableEXT](vkCmdSetSampleLocationsEnableEXT.html), then the
`sampleLocationsInfo.maxSampleLocationGridSize.height` in the last
call to [vkCmdSetSampleLocationsEXT](vkCmdSetSampleLocationsEXT.html) **must** evenly divide
[VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html)::`maxSampleLocationGridSize.height`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](vkGetPhysicalDeviceMultisamplePropertiesEXT.html) with a
`samples` parameter equaling `rasterizationSamples`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07487) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07487

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html)
stage, or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](VkDynamicState.html) state enabled, and if
`sampleLocationsEnable` was [VK_TRUE](VK_TRUE.html) in the last call to
[vkCmdSetSampleLocationsEnableEXT](vkCmdSetSampleLocationsEnableEXT.html), the fragment shader code **must**
not statically use the extended instruction `InterpolateAtSample`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07936) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07936

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) state disabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](VK_TRUE.html), then
`sampleLocationsInfo.sampleLocationGridSize.width` **must** evenly
divide
[VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html)::`maxSampleLocationGridSize.width`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](vkGetPhysicalDeviceMultisamplePropertiesEXT.html) with a
`samples` parameter equaling the value of `rasterizationSamples`
in the last call to [vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07937) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07937

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) state disabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](VK_TRUE.html), then
`sampleLocationsInfo.sampleLocationGridSize.height` **must** evenly
divide
[VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html)::`maxSampleLocationGridSize.height`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](vkGetPhysicalDeviceMultisamplePropertiesEXT.html) with a
`samples` parameter equaling the value of `rasterizationSamples`
in the last call to [vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07938) VUID-vkCmdDrawMeshTasksIndirect2EXT-sampleLocationsEnable-07938

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) state disabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) state enabled, and the
[current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](VK_TRUE.html), then
`sampleLocationsInfo.sampleLocationsPerPixel` **must** equal
`rasterizationSamples` in the last call to
[vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-coverageModulationTableEnable-07488) VUID-vkCmdDrawMeshTasksIndirect2EXT-coverageModulationTableEnable-07488

If
a shader object is bound to any graphics stage or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](VkDynamicState.html) state
enabled, and the last call to
[vkCmdSetCoverageModulationTableEnableNV](vkCmdSetCoverageModulationTableEnableNV.html) set
`coverageModulationTableEnable` to [VK_TRUE](VK_TRUE.html), then the
`coverageModulationTableCount` parameter in the last call to
[vkCmdSetCoverageModulationTableNV](vkCmdSetCoverageModulationTableNV.html) **must** equal the current
`rasterizationSamples` divided by the number of color samples in the
current active color attachment

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizationSamples-07489) VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizationSamples-07489

If the `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension is enabled,
and if current subpass has a depth/stencil attachment and depth test,
stencil test, or depth bounds test are enabled in the bound pipeline,
then the current `rasterizationSamples` **must** be the same as the
sample count of the depth/stencil attachment

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-coverageToColorEnable-07490) VUID-vkCmdDrawMeshTasksIndirect2EXT-coverageToColorEnable-07490

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](VkDynamicState.html) state enabled and the
last call to [vkCmdSetCoverageToColorEnableNV](vkCmdSetCoverageToColorEnableNV.html) set the
`coverageToColorEnable` to [VK_TRUE](VK_TRUE.html), then there **must** be an
active color attachment at the location selected by the last call to
[vkCmdSetCoverageToColorLocationNV](vkCmdSetCoverageToColorLocationNV.html) `coverageToColorLocation`,
with a [VkFormat](VkFormat.html) of [VK_FORMAT_R8_UINT](VkFormat.html),
[VK_FORMAT_R8_SINT](VkFormat.html), [VK_FORMAT_R16_UINT](VkFormat.html),
[VK_FORMAT_R16_SINT](VkFormat.html), [VK_FORMAT_R32_UINT](VkFormat.html), or
[VK_FORMAT_R32_SINT](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizerDiscardEnable-09420) VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizerDiscardEnable-09420

If the `[VK_NV_fragment_coverage_to_color](VK_NV_fragment_coverage_to_color.html)` extension is enabled,
and a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html)
stage, and the most recent call to [vkCmdSetRasterizerDiscardEnable](vkCmdSetRasterizerDiscardEnable.html)
in the current command buffer set `rasterizerDiscardEnable` to
[VK_FALSE](VK_FALSE.html), and the last call to
[vkCmdSetCoverageToColorEnableNV](vkCmdSetCoverageToColorEnableNV.html) set the
`coverageToColorEnable` to [VK_TRUE](VK_TRUE.html), then there **must** be an
active color attachment at the location selected by the last call to
[vkCmdSetCoverageToColorLocationNV](vkCmdSetCoverageToColorLocationNV.html) `coverageToColorLocation`,
with a [VkFormat](VkFormat.html) of [VK_FORMAT_R8_UINT](VkFormat.html),
[VK_FORMAT_R8_SINT](VkFormat.html), [VK_FORMAT_R16_UINT](VkFormat.html),
[VK_FORMAT_R16_SINT](VkFormat.html), [VK_FORMAT_R32_UINT](VkFormat.html), or
[VK_FORMAT_R32_SINT](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-coverageReductionMode-07491) VUID-vkCmdDrawMeshTasksIndirect2EXT-coverageReductionMode-07491

If the [`coverageReductionMode`](../../../../spec/latest/chapters/features.html#features-coverageReductionMode)
feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](VkDynamicState.html) or
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) dynamic states enabled,
then the [current values](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`coverageReductionMode`, `rasterizationSamples`, the sample
counts for the color and depth/stencil attachments (if the subpass has
them) **must** be a valid combination returned by
[vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV](vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-07492) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-07492

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) dynamic state enabled, but
not the [VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](VkDynamicState.html) dynamic state
enabled, then the bound graphics pipeline **must** have been created with
[VkPipelineViewportSwizzleStateCreateInfoNV](VkPipelineViewportSwizzleStateCreateInfoNV.html)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-07493) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-07493

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) and
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](VkDynamicState.html) dynamic states enabled then
the `viewportCount` parameter in the last call to
[vkCmdSetViewportSwizzleNV](vkCmdSetViewportSwizzleNV.html) **must** be greater than or equal to the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-09421) VUID-vkCmdDrawMeshTasksIndirect2EXT-viewportCount-09421

If the `[VK_NV_viewport_swizzle](VK_NV_viewport_swizzle.html)` extension is enabled, and a
shader object is bound to any graphics stage, then the
`viewportCount` parameter in the last call to
[vkCmdSetViewportSwizzleNV](vkCmdSetViewportSwizzleNV.html) **must** be greater than or equal to the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizationSamples-07494) VUID-vkCmdDrawMeshTasksIndirect2EXT-rasterizationSamples-07494

If the `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension is enabled,
and the [`coverageReductionMode`](../../../../spec/latest/chapters/features.html#features-coverageReductionMode)
feature is not enabled, or the [current    value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of `coverageReductionMode` is not
[VK_COVERAGE_REDUCTION_MODE_TRUNCATE_NV](VkCoverageReductionModeNV.html),
and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizationSamples` is greater than sample count of the color
attachment, then [sample shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) **must** be
disabled

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-stippledLineEnable-07495) VUID-vkCmdDrawMeshTasksIndirect2EXT-stippledLineEnable-07495

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](VkDynamicState.html) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](VkDynamicState.html) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](VK_TRUE.html) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](VkLineRasterizationMode.html), then the
[`stippledRectangularLines`](../../../../spec/latest/chapters/features.html#features-stippledRectangularLines)
feature **must** be enabled

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-stippledLineEnable-07496) VUID-vkCmdDrawMeshTasksIndirect2EXT-stippledLineEnable-07496

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](VkDynamicState.html) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](VkDynamicState.html) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](VK_TRUE.html) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](VkLineRasterizationMode.html), then the
[`stippledBresenhamLines`](../../../../spec/latest/chapters/features.html#features-stippledBresenhamLines)
feature **must** be enabled

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-stippledLineEnable-07497) VUID-vkCmdDrawMeshTasksIndirect2EXT-stippledLineEnable-07497

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](VkDynamicState.html) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](VkDynamicState.html) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](VK_TRUE.html) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](VkLineRasterizationMode.html), then the
[`stippledSmoothLines`](../../../../spec/latest/chapters/features.html#features-stippledSmoothLines) feature
**must** be enabled

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-stippledLineEnable-07498) VUID-vkCmdDrawMeshTasksIndirect2EXT-stippledLineEnable-07498

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](VkDynamicState.html) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](VkDynamicState.html) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](VK_TRUE.html) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_DEFAULT](VkLineRasterizationMode.html), then the
[`stippledRectangularLines`](../../../../spec/latest/chapters/features.html#features-stippledRectangularLines)
feature **must** be enabled and
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`strictLines` **must** be [VK_TRUE](VK_TRUE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-stage-07073) VUID-vkCmdDrawMeshTasksIndirect2EXT-stage-07073

If the bound pipeline was created with the
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)::`stage` member of an element
of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`pStages` set to
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html) or
[VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html), then [Mesh    Shader Queries](../../../../spec/latest/chapters/queries.html#queries-mesh-shader) **must** not be active

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08877) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08877

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](VkDynamicState.html) dynamic state
enabled, and the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html), then
[vkCmdSetAttachmentFeedbackLoopEnableEXT](vkCmdSetAttachmentFeedbackLoopEnableEXT.html) **must** have been called and
not subsequently [invalidated](../../../../spec/latest/chapters/pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07850) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07850

If dynamic state was inherited from
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html), it **must** be set
in the current command buffer prior to this drawing command

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-nextStage-10745) VUID-vkCmdDrawMeshTasksIndirect2EXT-nextStage-10745

For each shader object bound to a graphics stage, except for shader
object bound to the last graphics stage in the logical pipeline, it
**must** have been created with a `nextStage` including the
corresponding bit to the shader object bound to the following graphics
stage in the logical pipeline

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08684) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08684

If there is no bound graphics pipeline, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08685) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08685

If there is no bound graphics pipeline, and the
[`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature is
enabled, `vkCmdBindShadersEXT` **must** have been called in the current
command buffer with `pStages` with an element of
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08686) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08686

If there is no bound graphics pipeline, and the
[`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature is
enabled, `vkCmdBindShadersEXT` **must** have been called in the current
command buffer with `pStages` with an element of
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08687) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08687

If there is no bound graphics pipeline, and the
[`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is enabled,
`vkCmdBindShadersEXT` **must** have been called in the current command
buffer with `pStages` with an element of
[VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08688) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08688

If there is no bound graphics pipeline, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08689) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08689

If there is no bound graphics pipeline, and the [    `taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is enabled, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08690) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08690

If there is no bound graphics pipeline, and the [    `meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is enabled, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08693) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08693

If there is no bound graphics pipeline, and at least one of the
[`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) and [    `meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) features is enabled, one of the
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html) or [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)
stages **must** have a valid `VkShaderEXT` bound, and the other **must**
have no `VkShaderEXT` bound

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08696) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08696

If there is no bound graphics pipeline, and a valid `VkShaderEXT` is
bound to the [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html) stage, there **must** be no
`VkShaderEXT` bound to either the [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html)
stage or the [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html) stage

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08698) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08698

If any graphics shader is bound which was created with the
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag, then all shaders created
with the [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag in the same
[vkCreateShadersEXT](vkCreateShadersEXT.html) call **must** also be bound

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08699) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08699

If any graphics shader is bound which was created with the
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag, any stages in between
stages whose shaders which did not create a shader with the
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag as part of the same
[vkCreateShadersEXT](vkCreateShadersEXT.html) call **must** not have any `VkShaderEXT` bound

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08878) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08878

All bound graphics shader objects **must** have been created with identical
or [identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined) push constant
ranges

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08879) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08879

All bound graphics shader objects **must** have either been created with
the [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag set, or with
identical or [identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined) arrays
of descriptor set layouts

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-09372) VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-09372

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and a
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` equal to `1`, a color
attachment with a resolve mode of
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html), and a
fragment shader is bound, it **must** not declare the `DepthReplacing`
or `StencilRefReplacingEXT` execution modes

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pDynamicStates-08715) VUID-vkCmdDrawMeshTasksIndirect2EXT-pDynamicStates-08715

If the bound graphics pipeline state includes a fragment shader stage,
was created with [VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpDepthAttachmentReadEXT`, the `depthWriteEnable` parameter
in the last call to [vkCmdSetDepthWriteEnable](vkCmdSetDepthWriteEnable.html) **must** be
[VK_FALSE](VK_FALSE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pDynamicStates-08716) VUID-vkCmdDrawMeshTasksIndirect2EXT-pDynamicStates-08716

If the bound graphics pipeline state includes a fragment shader stage,
was created with [VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpStencilAttachmentReadEXT`, the `writeMask` parameter in
the last call to [vkCmdSetStencilWriteMask](vkCmdSetStencilWriteMask.html) **must** be `0`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09116) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09116

    If
    a shader object is bound to any graphics stage
or
    the bound graphics pipeline was created with
    [VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html),
    and the format of any color attachment is
    [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](VkFormat.html), the corresponding element of the
    `pColorWriteMasks` parameter of [vkCmdSetColorWriteMaskEXT](vkCmdSetColorWriteMaskEXT.html)
    **must** either include all of [VK_COLOR_COMPONENT_R_BIT](VkColorComponentFlagBits.html),
    [VK_COLOR_COMPONENT_G_BIT](VkColorComponentFlagBits.html), and [VK_COLOR_COMPONENT_B_BIT](VkColorComponentFlagBits.html), or
    none of them

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-maxFragmentDualSrcAttachments-09239) VUID-vkCmdDrawMeshTasksIndirect2EXT-maxFragmentDualSrcAttachments-09239

If [blending](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blending) is enabled for any attachment where
either the source or destination blend factors for that attachment
[use the secondary color input](../../../../spec/latest/chapters/framebuffer.html#framebuffer-dsb), the maximum value of
`Location` for any output attachment [statically    used](../../../../spec/latest/chapters/shaders.html#shaders-staticuse) in the `Fragment` `Execution` `Model` executed by this command
**must** be less than [    `maxFragmentDualSrcAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentDualSrcAttachments)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09548) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09548

If the current render pass was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html),
there is no shader object bound to any graphics stage,
the value of each element of
[VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html)::`pColorAttachmentLocations`
in the bound pipeline **must** match the value for the corresponding
locations set currently in the current render pass instance

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09549) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09549

If the current render pass was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html),
and there is no shader object bound to any graphics stage,
the value of each element of
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)::`pColorAttachmentInputIndices`
in the bound pipeline **must** match the value for the corresponding index
set currently in the current render pass instance

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10927) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10927

If the current render pass was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html),
and there is no shader object bound to any graphics stage,
the value of
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)::`pDepthInputAttachmentIndex`
in the bound pipeline **must** match the value set currently in the current
render pass instance

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10928) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10928

If the current render pass was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html),
and there is no shader object bound to any graphics stage,
the value of
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)::`pStencilInputAttachmentIndex`
in the bound pipeline **must** match the value set currently in the current
render pass instance

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09642) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09642

If the current render pass was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html) with
the [VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](VkRenderingFlagBits.html) flag, the bound
graphics pipeline **must** have been created with
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](VkPipelineCreateFlagBits2.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09643) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-09643

If the bound graphics pipeline was created with
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](VkPipelineCreateFlagBits2.html), the current
render pass **must** have begun with [vkCmdBeginRendering](vkCmdBeginRendering.html) with the
[VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](VkRenderingFlagBits.html) flag

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10677) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10677

If the [per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model)
is enabled, the
[tileShadingPerTileDraw](../../../../spec/latest/chapters/features.html#features-tileShadingPerTileDraw) feature **must**
be enabled

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10772) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-10772

If a shader object is bound to any graphics stage, *multiview*
functionality **must** not be enabled in the current render pass

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-multiviewPerViewViewports-12262) VUID-vkCmdDrawMeshTasksIndirect2EXT-multiviewPerViewViewports-12262

If the [    `multiviewPerViewViewports`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports) feature is enabled, then the index of
the most significant bit in current render pass instance `viewMask`
**must** be less than the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`viewportCount`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-multiviewPerViewViewports-12263) VUID-vkCmdDrawMeshTasksIndirect2EXT-multiviewPerViewViewports-12263

If the [    `multiviewPerViewViewports`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports) feature is enabled, then the index of
the most significant bit in current render pass instance `viewMask`
**must** be less than the [current value](../../../../spec/latest/chapters/pipelines.html#dynamic-state-current-value) of
`scissorCount`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-flags-11521) VUID-vkCmdDrawMeshTasksIndirect2EXT-flags-11521

If current render pass instance was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html)
with [VkRenderingInfo](VkRenderingInfo.html)::`flags` which includes
[VK_RENDERING_FRAGMENT_REGION_BIT_EXT](VkRenderingFlagBits.html), and if
[sample shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) is enabled (explicitly or
implicitly), then the minimum fraction for sample shading **must** equal
0.0

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11522) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11522

    If the current render pass instance was begun with
    [vkCmdBeginRendering](vkCmdBeginRendering.html) and contains a custom resolve,
and the [`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled,
    the graphics pipeline bound **must** have been created with a
    [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11523) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11523

    If the current render pass instance was begun with
    [vkCmdBeginRendering](vkCmdBeginRendering.html) and does not contain a custom resolve,
and the [`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled,
    the graphics pipeline bound **must** not have been created with a
    [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-customResolve-11524) VUID-vkCmdDrawMeshTasksIndirect2EXT-customResolve-11524

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance, the graphics pipeline bound **must**
have been created with
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` as [VK_TRUE](VK_TRUE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-customResolve-11525) VUID-vkCmdDrawMeshTasksIndirect2EXT-customResolve-11525

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and contains a custom resolve, and
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not been recorded in the render
pass instance, the graphics pipeline bound **must** have been created with
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` as
[VK_FALSE](VK_FALSE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11861) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11861

If
the [    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled and
the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and contains a custom resolve, the bound
graphics pipeline **must** have been created with a
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`colorAttachmentCount` equal to
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11862) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11862

If
the [    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), it contains a custom resolve, and
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array
with an `resolveImageView` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must**
have been created with a [VkFormat](VkFormat.html) equal to the corresponding
element of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`pColorAttachmentFormats` used
to create the bound graphics pipeline

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11863) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11863

If
the [    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), it contains a custom resolve, and
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array
with an `resolveImageView` equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have
the corresponding element of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`pColorAttachmentFormats` used
to create the bound pipeline equal to [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-11864) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-11864

If the [    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is enabled, the
current render pass instance was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html),
it contains a custom resolve, and
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array
with an `resolveImageView` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must**
have been created with a [VkFormat](VkFormat.html) equal to the corresponding
element of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`pColorAttachmentFormats` used
to create the bound graphics pipeline, or the corresponding element of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`pColorAttachmentFormats`, if it
exists, **must** be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11865) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11865

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView` was
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11866) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11866

If current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView` was
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to the [VkFormat](VkFormat.html)
used to create
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-11867) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-11867

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), it contains a custom resolve, the
[    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the value of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`depthAttachmentFormat` used to
create the bound graphics pipeline was not equal to the [VkFormat](VkFormat.html)
used to create
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView`, the
value of the format **must** be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11868) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11868

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView`
was [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11869) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-11869

If current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView`
was not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to the
[VkFormat](VkFormat.html) used to create
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-11870) VUID-vkCmdDrawMeshTasksIndirect2EXT-dynamicRenderingUnusedAttachments-11870

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), it contains a custom resolve, the
[    `dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView` was
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the value of
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`stencilAttachmentFormat` used
to create the bound graphics pipeline was not equal to the
[VkFormat](VkFormat.html) used to create
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView`, the
value of the format **must** be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-11871) VUID-vkCmdDrawMeshTasksIndirect2EXT-colorAttachmentCount-11871

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) with a
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` parameter greater than
`0` and [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been recorded in the render
pass instance, then for each element of the
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` array with a
`resolveImageView` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
`resolveImageView` **must** have been created with a sample count equal
to the value of `rasterizationSamples` for the bound graphics
pipeline

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthAttachment-11872) VUID-vkCmdDrawMeshTasksIndirect2EXT-pDepthAttachment-11872

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance, and
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of `rasterizationSamples` for the
bound graphics pipeline **must** be equal to the sample count used to
create [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pStencilAttachment-11873) VUID-vkCmdDrawMeshTasksIndirect2EXT-pStencilAttachment-11873

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance,
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView` was
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of `rasterizationSamples` for
the bound graphics pipeline **must** be equal to the sample count used to
create [VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView`

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-customResolve-11529) VUID-vkCmdDrawMeshTasksIndirect2EXT-customResolve-11529

If a shader object is bound to the fragment stage, the current render
pass instance was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html), a fragment
density map attachment is active, and [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html)
has been called, then the fragment shader object bound **must** have been
created with [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` as
[VK_TRUE](VK_TRUE.html)

[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-customResolve-11530) VUID-vkCmdDrawMeshTasksIndirect2EXT-customResolve-11530

If a shader object is bound to the fragment stage, the current render
pass instance was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html) and contains a
custom resolve, a fragment density map attachment is active, and
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been called, then the
fragment shader object bound **must** have been created with
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` as
[VK_FALSE](VK_FALSE.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-stage-06480) VUID-vkCmdDrawMeshTasksIndirect2EXT-stage-06480

The bound graphics pipeline **must** not have been created with the
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)::`stage` member of any element
of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`pStages` set to
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html) or
[VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pStages-10680) VUID-vkCmdDrawMeshTasksIndirect2EXT-pStages-10680

If there is no bound graphics pipeline, `vkCmdBindShadersEXT` **must**
not have last bound the `pStages` element of
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html) or
[VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html) with a valid shader object other than
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07074) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07074

[Transform Feedback Queries](../../../../spec/latest/chapters/queries.html#queries-transform-feedback) **must** not be
active

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07075) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-07075

[Primitives Generated Queries](../../../../spec/latest/chapters/queries.html#queries-primitives-generated) **must** not
be active

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pipelineStatistics-07076) VUID-vkCmdDrawMeshTasksIndirect2EXT-pipelineStatistics-07076

The `pipelineStatistics` member used to create any active
[Pipeline Statistics Query](../../../../spec/latest/chapters/queries.html#queries-pipestats) **must** not contain
[VK_QUERY_PIPELINE_STATISTIC_INPUT_ASSEMBLY_VERTICES_BIT](VkQueryPipelineStatisticFlagBits.html),
[VK_QUERY_PIPELINE_STATISTIC_INPUT_ASSEMBLY_PRIMITIVES_BIT](VkQueryPipelineStatisticFlagBits.html),
[VK_QUERY_PIPELINE_STATISTIC_VERTEX_SHADER_INVOCATIONS_BIT](VkQueryPipelineStatisticFlagBits.html),
[VK_QUERY_PIPELINE_STATISTIC_GEOMETRY_SHADER_INVOCATIONS_BIT](VkQueryPipelineStatisticFlagBits.html),
[VK_QUERY_PIPELINE_STATISTIC_GEOMETRY_SHADER_PRIMITIVES_BIT](VkQueryPipelineStatisticFlagBits.html),
[VK_QUERY_PIPELINE_STATISTIC_CLIPPING_INVOCATIONS_BIT](VkQueryPipelineStatisticFlagBits.html),
[VK_QUERY_PIPELINE_STATISTIC_CLIPPING_PRIMITIVES_BIT](VkQueryPipelineStatisticFlagBits.html),
[VK_QUERY_PIPELINE_STATISTIC_TESSELLATION_CONTROL_SHADER_PATCHES_BIT](VkQueryPipelineStatisticFlagBits.html),
or
[VK_QUERY_PIPELINE_STATISTIC_TESSELLATION_EVALUATION_SHADER_INVOCATIONS_BIT](VkQueryPipelineStatisticFlagBits.html)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08694) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08694

If there is no bound graphics pipeline, and both the
[`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) and [    `meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) features are enabled, and a valid `VkShaderEXT`
is bound the to the [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html) stage, and that
`VkShaderEXT` was created without the
[VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag, a valid
`VkShaderEXT` **must** be bound to the
[VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html) stage

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08695) VUID-vkCmdDrawMeshTasksIndirect2EXT-None-08695

If there is no bound graphics pipeline, and both the
[`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) and [    `meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) features are enabled, and a valid `VkShaderEXT`
is bound the to the [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html) stage, and that
`VkShaderEXT` was created with the
[VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag, there **must** be no
`VkShaderEXT` bound to the [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html) stage

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-13067) VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-13067

`commandBuffer` **must** not be a protected command buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-parameter) VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-pInfo-parameter) VUID-vkCmdDrawMeshTasksIndirect2EXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDrawIndirect2InfoKHR](VkDrawIndirect2InfoKHR.html) structure

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-recording) VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-cmdpool) VUID-vkCmdDrawMeshTasksIndirect2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-renderpass) VUID-vkCmdDrawMeshTasksIndirect2EXT-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-suspended) VUID-vkCmdDrawMeshTasksIndirect2EXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDrawMeshTasksIndirect2EXT-videocoding) VUID-vkCmdDrawMeshTasksIndirect2EXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDrawMeshTasksIndirect2EXT is affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDrawIndirect2InfoKHR](VkDrawIndirect2InfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#vkCmdDrawMeshTasksIndirect2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
