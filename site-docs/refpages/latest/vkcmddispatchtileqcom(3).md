# vkCmdDispatchTileQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDispatchTileQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDispatchTileQCOM - Dispatch per-tile work items

To record an area-based dispatch, call:

// Provided by VK_QCOM_tile_shading
void vkCmdDispatchTileQCOM(
    VkCommandBuffer                             commandBuffer,
    const VkDispatchTileInfoQCOM*               pDispatchTileInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDispatchTileInfo` is a pointer to a [VkDispatchTileInfoQCOM](VkDispatchTileInfoQCOM.html)
structure containing information about the area-based dispatch.

This command operates in the [per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model), invoking a separate dispatch for each *covered tile*.
The global workgroup count and local workgroup size of each dispatch are
defined by the implementation to efficiently iterate over a uniform grid of
pixel blocks within the area of its *active tile*.

Each shader invocation operates on a single pixel block and its size is
determined by the shader’s tiling rate, which **must** be defined by shaders
executed by this command.
The `TileShadingRateQCOM` execution mode operand defines the shader’s
tiling rate.
Its `x` and `y` **must** be a power of two and less than or equal to
the [maxTileShadingRate](../../../../spec/latest/chapters/limits.html#limits-maxTileShadingRate) limit.
Its `z` **must** be less than or equal to the active tile’s depth as
reported by [VK_QCOM_tile_properties](VK_QCOM_tile_properties.html), and
[VkTilePropertiesQCOM](VkTilePropertiesQCOM.html).tileSize.z %
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

If a [VkSampler](VkSampler.html) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](VkFilter.html),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html),
and `compareEnable` equal to [VK_FALSE](VK_FALSE.html) is used to sample a
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-magFilter-09598) VUID-vkCmdDispatchTileQCOM-magFilter-09598

If a [VkSampler](VkSampler.html) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](VkFilter.html) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](VkSamplerReductionMode.html) or
[VK_SAMPLER_REDUCTION_MODE_MAX](VkSamplerReductionMode.html) is used to sample a
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-mipmapMode-04770) VUID-vkCmdDispatchTileQCOM-mipmapMode-04770

If a [VkSampler](VkSampler.html) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](VkSamplerMipmapMode.html),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html),
and `compareEnable` equal to [VK_FALSE](VK_FALSE.html) is used to sample a
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-mipmapMode-09599) VUID-vkCmdDispatchTileQCOM-mipmapMode-09599

If a [VkSampler](VkSampler.html) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](VkSamplerMipmapMode.html) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](VkSamplerReductionMode.html) or
[VK_SAMPLER_REDUCTION_MODE_MAX](VkSamplerReductionMode.html) is used to sample a
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-unnormalizedCoordinates-09635) VUID-vkCmdDispatchTileQCOM-unnormalizedCoordinates-09635

If a [VkSampler](VkSampler.html) created with `unnormalizedCoordinates` equal to
[VK_TRUE](VK_TRUE.html) is used to sample a [VkImageView](VkImageView.html) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08609) VUID-vkCmdDispatchTileQCOM-None-08609

If a [VkSampler](VkSampler.html) created with `unnormalizedCoordinates` equal to
[VK_TRUE](VK_TRUE.html) is used to sample a [VkImageView](VkImageView.html) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08610) VUID-vkCmdDispatchTileQCOM-None-08610

If a [VkSampler](VkSampler.html) created with `unnormalizedCoordinates` equal to
[VK_TRUE](VK_TRUE.html) is used to sample a [VkImageView](VkImageView.html) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08611) VUID-vkCmdDispatchTileQCOM-None-08611

If a [VkSampler](VkSampler.html) created with `unnormalizedCoordinates` equal to
[VK_TRUE](VK_TRUE.html) is used to sample a [VkImageView](VkImageView.html) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDispatchTileQCOM-None-06479) VUID-vkCmdDispatchTileQCOM-None-06479

If a [VkImageView](VkImageView.html) is sampled with
[depth comparison](../../../../spec/latest/chapters/textures.html#textures-depth-compare-operation), the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-02691) VUID-vkCmdDispatchTileQCOM-None-02691

If a [VkImageView](VkImageView.html) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-07888) VUID-vkCmdDispatchTileQCOM-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-02692) VUID-vkCmdDispatchTileQCOM-None-02692

If a [VkImageView](VkImageView.html) is sampled with [VK_FILTER_CUBIC_EXT](VkFilter.html) as a
result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-02693) VUID-vkCmdDispatchTileQCOM-None-02693

If
the [VK_EXT_filter_cubic](VK_EXT_filter_cubic.html) extension is not enabled and
any [VkImageView](VkImageView.html) is sampled with [VK_FILTER_CUBIC_EXT](VkFilter.html) as a
result of this command, it **must** not have a [VkImageViewType](VkImageViewType.html) of
[VK_IMAGE_VIEW_TYPE_3D](VkImageViewType.html), [VK_IMAGE_VIEW_TYPE_CUBE](VkImageViewType.html), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](VkImageViewType.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-filterCubic-02694) VUID-vkCmdDispatchTileQCOM-filterCubic-02694

Any [VkImageView](VkImageView.html) being sampled with [VK_FILTER_CUBIC_EXT](VkFilter.html) as a
result of this command **must** have a [VkImageViewType](VkImageViewType.html) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](VkFilterCubicImageViewImageFormatPropertiesEXT.html)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-filterCubicMinmax-02695) VUID-vkCmdDispatchTileQCOM-filterCubicMinmax-02695

Any [VkImageView](VkImageView.html) being sampled with [VK_FILTER_CUBIC_EXT](VkFilter.html) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](VkSamplerReductionMode.html) or
[VK_SAMPLER_REDUCTION_MODE_MAX](VkSamplerReductionMode.html) as a result of this command **must**
have a [VkImageViewType](VkImageViewType.html) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](VkFilterCubicImageViewImageFormatPropertiesEXT.html)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-cubicRangeClamp-09212) VUID-vkCmdDispatchTileQCOM-cubicRangeClamp-09212

If the [`cubicRangeClamp`](../../../../spec/latest/chapters/features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](VkImageView.html) being sampled with
[VK_FILTER_CUBIC_EXT](VkFilter.html) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](VkSamplerReductionMode.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-reductionMode-09213) VUID-vkCmdDispatchTileQCOM-reductionMode-09213

Any [VkImageView](VkImageView.html) being sampled with a
[VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](VkSamplerReductionMode.html) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](VkFilter.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-selectableCubicWeights-09214) VUID-vkCmdDispatchTileQCOM-selectableCubicWeights-09214

If the [`selectableCubicWeights`](../../../../spec/latest/chapters/features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](VkImageView.html) being sampled with
[VK_FILTER_CUBIC_EXT](VkFilter.html) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](VkSamplerCubicWeightsCreateInfoQCOM.html)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](VkCubicFilterWeightsQCOM.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-flags-02696) VUID-vkCmdDispatchTileQCOM-flags-02696

Any [VkImage](VkImage.html) created with a [VkImageCreateInfo](VkImageCreateInfo.html)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](VkImageCreateFlagBits.html) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](VkSamplerAddressMode.html) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](VkSamplerAddressMode.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeImage-07027) VUID-vkCmdDispatchTileQCOM-OpTypeImage-07027

For any [VkImageView](VkImageView.html) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeImage-07028) VUID-vkCmdDispatchTileQCOM-OpTypeImage-07028

For any [VkImageView](VkImageView.html) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeImage-07029) VUID-vkCmdDispatchTileQCOM-OpTypeImage-07029

For any [VkBufferView](VkBufferView.html) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](../../../../spec/latest/chapters/formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeImage-07030) VUID-vkCmdDispatchTileQCOM-OpTypeImage-07030

Any [VkBufferView](VkBufferView.html) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](../../../../spec/latest/chapters/formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08600) VUID-vkCmdDispatchTileQCOM-None-08600

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
[](#VUID-vkCmdDispatchTileQCOM-None-08601) VUID-vkCmdDispatchTileQCOM-None-08601

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
[](#VUID-vkCmdDispatchTileQCOM-None-10068) VUID-vkCmdDispatchTileQCOM-None-10068

For each array of resources that is used by [a bound    shader](../../../../spec/latest/chapters/shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDispatchTileQCOM-maintenance4-08602) VUID-vkCmdDispatchTileQCOM-maintenance4-08602

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
[](#VUID-vkCmdDispatchTileQCOM-None-08114) VUID-vkCmdDispatchTileQCOM-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), **must** be valid if they are accessed as
described by [descriptor validity](../../../../spec/latest/chapters/descriptorsets.html#descriptor-validity) by
the [VkPipeline](VkPipeline.html) bound to the pipeline bind point used by this
command and the bound [VkPipeline](VkPipeline.html) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-imageLayout-00344) VUID-vkCmdDispatchTileQCOM-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](VkImageLayout.html)
**must** match the subresource accessible from the [VkImageView](VkImageView.html) as
defined by the [image layout    matching rules](../../../../spec/latest/chapters/resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08115) VUID-vkCmdDispatchTileQCOM-None-08115

If the descriptors used by the [VkPipeline](VkPipeline.html) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), the bound
[VkPipeline](VkPipeline.html) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08116) VUID-vkCmdDispatchTileQCOM-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html), **must** be valid if they are
dynamically used by the [VkPipeline](VkPipeline.html) bound to the pipeline bind
point used by this command and the bound [VkPipeline](VkPipeline.html) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08604) VUID-vkCmdDispatchTileQCOM-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html), **must** be valid if they are
dynamically used by any [VkShaderEXT](VkShaderEXT.html) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08117) VUID-vkCmdDispatchTileQCOM-None-08117

If the descriptors used by the [VkPipeline](VkPipeline.html) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html),
the bound [VkPipeline](VkPipeline.html) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08119) VUID-vkCmdDispatchTileQCOM-None-08119

If a descriptor is dynamically used with a [VkPipeline](VkPipeline.html) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08605) VUID-vkCmdDispatchTileQCOM-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](VkShaderEXT.html) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08606) VUID-vkCmdDispatchTileQCOM-None-08606

If the [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDispatchTileQCOM-None-08608) VUID-vkCmdDispatchTileQCOM-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](VkPipeline.html) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDispatchTileQCOM-uniformBuffers-06935) VUID-vkCmdDispatchTileQCOM-uniformBuffers-06935

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
[](#VUID-vkCmdDispatchTileQCOM-None-08612) VUID-vkCmdDispatchTileQCOM-None-08612

If the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](VkShaderEXT.html) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchTileQCOM-storageBuffers-06936) VUID-vkCmdDispatchTileQCOM-storageBuffers-06936

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
[](#VUID-vkCmdDispatchTileQCOM-None-08613) VUID-vkCmdDispatchTileQCOM-None-08613

If the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](VkShaderEXT.html) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-02707) VUID-vkCmdDispatchTileQCOM-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](../../../../spec/latest/chapters/shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDispatchTileQCOM-viewType-07752) VUID-vkCmdDispatchTileQCOM-viewType-07752

If a [VkImageView](VkImageView.html) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../../../../spec/latest/appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDispatchTileQCOM-format-07753) VUID-vkCmdDispatchTileQCOM-format-07753

If a [VkImageView](VkImageView.html) or [VkBufferView](VkBufferView.html) is accessed as a result of
this command, then the [numeric type](../../../../spec/latest/chapters/formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageWrite-08795) VUID-vkCmdDispatchTileQCOM-OpImageWrite-08795

If a [VkImageView](VkImageView.html)
created with a format other than [VK_FORMAT_A8_UNORM](VkFormat.html)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageWrite-08796) VUID-vkCmdDispatchTileQCOM-OpImageWrite-08796

If a [VkImageView](VkImageView.html) created with the format [VK_FORMAT_A8_UNORM](VkFormat.html)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageWrite-04469) VUID-vkCmdDispatchTileQCOM-OpImageWrite-04469

If a [VkBufferView](VkBufferView.html) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDispatchTileQCOM-SampledType-04470) VUID-vkCmdDispatchTileQCOM-SampledType-04470

If a [VkImageView](VkImageView.html) with a [VkFormat](VkFormat.html) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDispatchTileQCOM-SampledType-04471) VUID-vkCmdDispatchTileQCOM-SampledType-04471

If a [VkImageView](VkImageView.html) with a [VkFormat](VkFormat.html) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchTileQCOM-SampledType-04472) VUID-vkCmdDispatchTileQCOM-SampledType-04472

If a [VkBufferView](VkBufferView.html) with a [VkFormat](VkFormat.html) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDispatchTileQCOM-SampledType-04473) VUID-vkCmdDispatchTileQCOM-SampledType-04473

If a [VkBufferView](VkBufferView.html) with a [VkFormat](VkFormat.html) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchTileQCOM-sparseImageInt64Atomics-04474) VUID-vkCmdDispatchTileQCOM-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](../../../../spec/latest/chapters/features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](VkImage.html)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDispatchTileQCOM-sparseImageInt64Atomics-04475) VUID-vkCmdDispatchTileQCOM-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](../../../../spec/latest/chapters/features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](VkBuffer.html)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](VkImageView.html)
as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](VkImageView.html) as a sample
weight image as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBoxFilterQCOM-06973) VUID-vkCmdDispatchTileQCOM-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](VkImageView.html) as a
result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](../../../../spec/latest/chapters/textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](VkSampler.html) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDispatchTileQCOM-OpImageSampleWeightedQCOM-06978

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
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09215) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09216) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](VkImageView.html) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09217) VUID-vkCmdDispatchTileQCOM-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](../../../../spec/latest/chapters/textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-07288) VUID-vkCmdDispatchTileQCOM-None-07288

Any shader invocation executed by this command **must**
[terminate](../../../../spec/latest/chapters/shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-09600) VUID-vkCmdDispatchTileQCOM-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-10746) VUID-vkCmdDispatchTileQCOM-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](../../../../spec/latest/chapters/memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10678) VUID-vkCmdDispatchTileQCOM-None-10678

If this command is recorded inside a [tile    shading render pass](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html), [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10679) VUID-vkCmdDispatchTileQCOM-None-10679

If this command is recorded where
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html) layout

* 
[](#VUID-vkCmdDispatchTileQCOM-pDescription-09900) VUID-vkCmdDispatchTileQCOM-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](VkTensorARM.html) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](VkTensorUsageFlagBitsARM.html)
usage flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-dimensionCount-09905) VUID-vkCmdDispatchTileQCOM-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`pDescription` when creating the
underlying [VkTensorARM](VkTensorARM.html) object

* 
[](#VUID-vkCmdDispatchTileQCOM-OpTypeTensorARM-09906) VUID-vkCmdDispatchTileQCOM-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../../../../spec/latest/appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](VkFormat.html) of the
[VkTensorViewARM](VkTensorViewARM.html) used for the access

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11297) VUID-vkCmdDispatchTileQCOM-None-11297

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
[](#VUID-vkCmdDispatchTileQCOM-None-11298) VUID-vkCmdDispatchTileQCOM-None-11298

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
[](#VUID-vkCmdDispatchTileQCOM-None-11299) VUID-vkCmdDispatchTileQCOM-None-11299

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
[](#VUID-vkCmdDispatchTileQCOM-None-11397) VUID-vkCmdDispatchTileQCOM-None-11397

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
[](#VUID-vkCmdDispatchTileQCOM-None-11300) VUID-vkCmdDispatchTileQCOM-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11301) VUID-vkCmdDispatchTileQCOM-None-11301

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
[](#VUID-vkCmdDispatchTileQCOM-None-11302) VUID-vkCmdDispatchTileQCOM-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11304) VUID-vkCmdDispatchTileQCOM-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11305) VUID-vkCmdDispatchTileQCOM-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11306) VUID-vkCmdDispatchTileQCOM-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11308) VUID-vkCmdDispatchTileQCOM-None-11308

For each [descriptor heap](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding), either directly or via a
[descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11309) VUID-vkCmdDispatchTileQCOM-None-11309

If a [bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding) was created
as a [VkShaderEXT](VkShaderEXT.html) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11372) VUID-vkCmdDispatchTileQCOM-None-11372

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
[](#VUID-vkCmdDispatchTileQCOM-None-11373) VUID-vkCmdDispatchTileQCOM-None-11373

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
[](#VUID-vkCmdDispatchTileQCOM-None-11374) VUID-vkCmdDispatchTileQCOM-None-11374

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
[](#VUID-vkCmdDispatchTileQCOM-pBindInfo-11375) VUID-vkCmdDispatchTileQCOM-pBindInfo-11375

If any [bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](vkCmdBindSamplerHeapEXT.html)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11376) VUID-vkCmdDispatchTileQCOM-None-11376

If a [bound shader](../../../../spec/latest/chapters/shaders.html#shaders-binding) was created
as a [VkShaderEXT](VkShaderEXT.html) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](vkCmdPushDataEXT.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11398) VUID-vkCmdDispatchTileQCOM-None-11398

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
[](#VUID-vkCmdDispatchTileQCOM-None-11437) VUID-vkCmdDispatchTileQCOM-None-11437

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
[](#VUID-vkCmdDispatchTileQCOM-None-11438) VUID-vkCmdDispatchTileQCOM-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11441) VUID-vkCmdDispatchTileQCOM-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11439) VUID-vkCmdDispatchTileQCOM-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11442) VUID-vkCmdDispatchTileQCOM-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-11485) VUID-vkCmdDispatchTileQCOM-None-11485

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
[](#VUID-vkCmdDispatchTileQCOM-index-11450) VUID-vkCmdDispatchTileQCOM-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](VkSamplerCustomBorderColorIndexCreateInfoEXT.html), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](VkSamplerCustomBorderColorIndexCreateInfoEXT.html)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDispatchTileQCOM-protectedNoFault-11455) VUID-vkCmdDispatchTileQCOM-protectedNoFault-11455

If [`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html) create flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-protectedNoFault-11456) VUID-vkCmdDispatchTileQCOM-protectedNoFault-11456

If [`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html) create flag set

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10672) VUID-vkCmdDispatchTileQCOM-None-10672

If the [per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model)
is not enabled,
this command **must** be called outside of a render pass instance

* 
[](#VUID-vkCmdDispatchTileQCOM-aspectMask-10673) VUID-vkCmdDispatchTileQCOM-aspectMask-10673

If this command is recorded where
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled, and if the [VkPipeline](VkPipeline.html) object bound to the pipeline bind
point used by this command writes to a variable of storage class
`Storage` `Class` `TileAttachmentQCOM`, the corresponding
[VkImageView](VkImageView.html) using **must** not have been created with an
`aspectMask` that contains [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10674) VUID-vkCmdDispatchTileQCOM-None-10674

If the [per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model)
is enabled, the
[tileShadingPerTileDispatch](../../../../spec/latest/chapters/features.html#features-tileShadingPerTileDispatch)
feature **must** be enabled

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10675) VUID-vkCmdDispatchTileQCOM-None-10675

Memory backing image subresources used as
[tile attachments](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading-attachment-access) in the
current render pass **must** not be written in any way other than as a tile
attachment by this command

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10676) VUID-vkCmdDispatchTileQCOM-None-10676

If any recorded command in the current subpass will write to an image
subresource as a [tile    attachment](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading-attachment-access), this command **must** not read from the memory backing that
image subresource in any other way than as a tile attachment

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10743) VUID-vkCmdDispatchTileQCOM-None-10743

If there is no bound compute pipeline, a valid `VkShaderEXT` **must**
be bound to the [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) stage

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-02712) VUID-vkCmdDispatchTileQCOM-commandBuffer-02712

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
any resource written to by the `VkPipeline` object bound to the
pipeline bind point used by this command **must** not be an unprotected
resource

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-02713) VUID-vkCmdDispatchTileQCOM-commandBuffer-02713

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
pipeline stages other than the framebuffer-space and compute stages in
the `VkPipeline` object bound to the pipeline bind point used by
this command **must** not write to any resource

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-04617) VUID-vkCmdDispatchTileQCOM-commandBuffer-04617

If any of the shader stages of the `VkPipeline` bound to the
pipeline bind point used by this command uses the
[`RayQueryKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayQueryKHR)
capability, then `commandBuffer` **must** not be a protected command
buffer

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10668) VUID-vkCmdDispatchTileQCOM-None-10668

When this command is recorded
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) **must**
be enabled

* 
[](#VUID-vkCmdDispatchTileQCOM-None-10669) VUID-vkCmdDispatchTileQCOM-None-10669

The [tileShadingDispatchTile](../../../../spec/latest/chapters/features.html#features-tileShadingDispatchTile) **must**
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-parameter) VUID-vkCmdDispatchTileQCOM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDispatchTileQCOM-pDispatchTileInfo-parameter) VUID-vkCmdDispatchTileQCOM-pDispatchTileInfo-parameter

 `pDispatchTileInfo` **must** be a valid pointer to a valid [VkDispatchTileInfoQCOM](VkDispatchTileInfoQCOM.html) structure

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-recording) VUID-vkCmdDispatchTileQCOM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchTileQCOM-commandBuffer-cmdpool) VUID-vkCmdDispatchTileQCOM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

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
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdDispatchTileQCOM is affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDispatchTileInfoQCOM](VkDispatchTileInfoQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#vkCmdDispatchTileQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
