# RuntimeSpirv(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/RuntimeSpirv.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

RuntimeSpirv - Runtime SPIR-V Validation

The following rules **must** be validated at runtime.
These rules depend on knowledge of the implementation and its capabilities
and knowledge of runtime information, such as enabled features.

Valid Usage

* 
[](#VUID-RuntimeSpirv-vulkanMemoryModel-06265) VUID-RuntimeSpirv-vulkanMemoryModel-06265

If the [`vulkanMemoryModel`](../../../../spec/latest/chapters/features.html#features-vulkanMemoryModel) feature
is enabled and the [    `vulkanMemoryModelDeviceScope`](../../../../spec/latest/chapters/features.html#features-vulkanMemoryModelDeviceScope) feature is not enabled, `Device`
memory scope **must** not be used

* 
[](#VUID-RuntimeSpirv-vulkanMemoryModel-06266) VUID-RuntimeSpirv-vulkanMemoryModel-06266

If the [`vulkanMemoryModel`](../../../../spec/latest/chapters/features.html#features-vulkanMemoryModel) feature
is not enabled, `QueueFamily` memory scope **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderSubgroupClock-06267) VUID-RuntimeSpirv-shaderSubgroupClock-06267

If the [`shaderSubgroupClock`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupClock)
feature is not enabled, the `Subgroup` scope **must** not be used for
`OpReadClockKHR`

* 
[](#VUID-RuntimeSpirv-shaderDeviceClock-06268) VUID-RuntimeSpirv-shaderDeviceClock-06268

If the [`shaderDeviceClock`](../../../../spec/latest/chapters/features.html#features-shaderDeviceClock) feature
is not enabled, the `Device` scope **must** not be used for
`OpReadClockKHR`

* 
[](#VUID-RuntimeSpirv-shaderRelaxedExtendedInstruction-10773) VUID-RuntimeSpirv-shaderRelaxedExtendedInstruction-10773

If the [    `shaderRelaxedExtendedInstruction`](../../../../spec/latest/chapters/features.html#features-shaderRelaxedExtendedInstruction) feature is not enabled, the
`OpExtInstWithForwardRefsKHR` **must** not be used

* 
[](#VUID-RuntimeSpirv-None-09558) VUID-RuntimeSpirv-None-09558

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, any
variable created with a “Type” of `OpTypeImage` that has a “Dim”
operand of `SubpassData` **must** be decorated with
`InputAttachmentIndex`

* 
[](#VUID-RuntimeSpirv-OpTypeImage-09644) VUID-RuntimeSpirv-OpTypeImage-09644

Any variable declared as an `OpTypeArray` where the `Element`
`Type` is an `OpTypeImage` with a “Dim” operand of
`SubpassData` **must** be decorated with `InputAttachmentIndex`

* 
[](#VUID-RuntimeSpirv-apiVersion-07954) VUID-RuntimeSpirv-apiVersion-07954

If [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than
Vulkan 1.3, the [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) extension is not
supported, and the [    `shaderStorageImageWriteWithoutFormat`](../../../../spec/latest/chapters/features.html#features-shaderStorageImageWriteWithoutFormat) feature is not enabled, any
variable created with a “Type” of `OpTypeImage` that has a
“Sampled” operand of 2 and an “Image Format” operand of `Unknown`
**must** be decorated with `NonWritable`

* 
[](#VUID-RuntimeSpirv-apiVersion-07955) VUID-RuntimeSpirv-apiVersion-07955

If [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than
Vulkan 1.3, the [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) extension is not
supported, and the [    `shaderStorageImageReadWithoutFormat`](../../../../spec/latest/chapters/features.html#features-shaderStorageImageReadWithoutFormat) feature is not enabled, any
variable created with a “Type” of `OpTypeImage` that has a
“Sampled” operand of 2 and an “Image Format” operand of `Unknown`
**must** be decorated with `NonReadable`

* 
[](#VUID-RuntimeSpirv-OpImageWrite-07112) VUID-RuntimeSpirv-OpImageWrite-07112

`OpImageWrite` to any `Image` whose `Image` `Format` is not
`Unknown` **must** have the `Texel` operand contain at least as many
components as the corresponding [VkFormat](VkFormat.html) as given in the
[SPIR-V Image Format compatibility table](../../../../spec/latest/appendices/spirvenv.html#spirvenv-image-formats)

* 
[](#VUID-RuntimeSpirv-Location-06272) VUID-RuntimeSpirv-Location-06272

The sum of `Location` and the number of locations the variable it
decorates consumes **must** be less than or equal to the value for the
matching `Execution` `Model` defined in [Shader Input and Output Locations](../../../../spec/latest/chapters/interfaces.html#interfaces-iointerfaces-limits)

* 
[](#VUID-RuntimeSpirv-Location-06428) VUID-RuntimeSpirv-Location-06428

The maximum number of storage buffers, storage images, and output
`Location` decorated color attachments written to in the
`Fragment` `Execution` `Model` **must** be less than or equal to
[    `maxFragmentCombinedOutputResources`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentCombinedOutputResources)

* 
[](#VUID-RuntimeSpirv-UniformBufferArrayNonUniformIndexing-10134) VUID-RuntimeSpirv-UniformBufferArrayNonUniformIndexing-10134

If the `UniformBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a uniform buffer,
the uniform buffer through which that memory is accessed **must** be
dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-SampledImageArrayNonUniformIndexing-10135) VUID-RuntimeSpirv-SampledImageArrayNonUniformIndexing-10135

If the `SampledImageArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a sampled image or
sampler, the sampled image or sampler through which that memory is
accessed **must** be dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-StorageBufferArrayNonUniformIndexing-10136) VUID-RuntimeSpirv-StorageBufferArrayNonUniformIndexing-10136

If the `StorageBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage buffer,
the storage buffer through which that memory is accessed **must** be
dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-StorageImageArrayNonUniformIndexing-10137) VUID-RuntimeSpirv-StorageImageArrayNonUniformIndexing-10137

If the `StorageImageArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage image,
the storage image through which that memory is accessed **must** be
dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-InputAttachmentArrayNonUniformIndexing-10138) VUID-RuntimeSpirv-InputAttachmentArrayNonUniformIndexing-10138

If the `InputAttachmentArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through an input
attachment, the input attachment through which that memory is accessed
**must** be dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-UniformTexelBufferArrayNonUniformIndexing-10139) VUID-RuntimeSpirv-UniformTexelBufferArrayNonUniformIndexing-10139

If the `UniformTexelBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a uniform texel
buffer, the uniform texel buffer through which that memory is accessed
**must** be dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-StorageTexelBufferArrayNonUniformIndexing-10140) VUID-RuntimeSpirv-StorageTexelBufferArrayNonUniformIndexing-10140

If the `StorageTexelBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage texel
buffer, the storage texel buffer through which that memory is accessed
**must** be dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-subgroupSize-10141) VUID-RuntimeSpirv-subgroupSize-10141

If the [effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `UniformBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a uniform buffer,
the uniform buffer through which that memory is accessed **must** be
dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10142) VUID-RuntimeSpirv-subgroupSize-10142

If the [effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `SampledImageArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a sampled image or
sampler, the sampled image or sampler through which that memory is
accessed **must** be dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10143) VUID-RuntimeSpirv-subgroupSize-10143

If the [effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `StorageBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage buffer,
the storage buffer through which that memory is accessed **must** be
dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10144) VUID-RuntimeSpirv-subgroupSize-10144

If the [effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `StorageImageArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage image,
the storage image through which that memory is accessed **must** be
dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10145) VUID-RuntimeSpirv-subgroupSize-10145

If the [effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `InputAttachmentArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through an input
attachment, the input attachment through which that memory is accessed
**must** be dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10146) VUID-RuntimeSpirv-subgroupSize-10146

If the [effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `UniformTexelBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a uniform texel
buffer, the uniform texel buffer through which that memory is accessed
**must** be dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10147) VUID-RuntimeSpirv-subgroupSize-10147

If the [effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `StorageTexelBufferArrayNonUniformIndexing` capability is not
is not declared, and an instruction accesses memory through a storage
texel buffer, the storage texel buffer through which that memory is
accessed **must** be dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-None-04745) VUID-RuntimeSpirv-None-04745

All block members in a variable with a `Storage` `Class` of
`PushConstant` declared as an array **must** only be accessed by
dynamically uniform indices

* 
[](#VUID-RuntimeSpirv-None-10148) VUID-RuntimeSpirv-None-10148

If an instruction accesses memory through any resource,
the [effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is 1,
the `DescriptorHeapEXT` capability is not declared,
and the resource through which that memory is accessed is not uniform
within the invocation group, then the operand corresponding to that
resource (e.g. the pointer or sampled image operand) **must** be decorated
with `NonUniform`

* 
[](#VUID-RuntimeSpirv-subgroupSize-10149) VUID-RuntimeSpirv-subgroupSize-10149

If an instruction accesses memory through any resource, the
[effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is greater
than 1,
the `DescriptorHeapEXT` capability is not declared,
and the resource through which that memory is accessed is not uniform
within the invocation group, and not uniform within the subgroup, then
the operand corresponding to that resource (e.g. the pointer or sampled
image operand) **must** be decorated with `NonUniform`

* 
[](#VUID-RuntimeSpirv-None-06275) VUID-RuntimeSpirv-None-06275

[    `shaderSubgroupExtendedTypes`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupExtendedTypes) **must** be enabled for
[group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) to use 8-bit integer,
16-bit integer, 64-bit integer, 16-bit floating-point, and vectors of
these types

* 
[](#VUID-RuntimeSpirv-subgroupBroadcastDynamicId-06276) VUID-RuntimeSpirv-subgroupBroadcastDynamicId-06276

If [    `subgroupBroadcastDynamicId`](../../../../spec/latest/chapters/features.html#features-subgroupBroadcastDynamicId) is [VK_TRUE](VK_TRUE.html), and the shader
module version is 1.5 or higher, the “Index” for
`OpGroupNonUniformQuadBroadcast` **must** be dynamically uniform within
the derivative group.
Otherwise, “Index” **must** be a constant

* 
[](#VUID-RuntimeSpirv-subgroupBroadcastDynamicId-06277) VUID-RuntimeSpirv-subgroupBroadcastDynamicId-06277

If [    `subgroupBroadcastDynamicId`](../../../../spec/latest/chapters/features.html#features-subgroupBroadcastDynamicId) is [VK_TRUE](VK_TRUE.html), and the shader
module version is 1.5 or higher, the “Id” for
`OpGroupNonUniformBroadcast` **must** be dynamically uniform within the
subgroup.
Otherwise, “Id” **must** be a constant

* 
[](#VUID-RuntimeSpirv-None-06278) VUID-RuntimeSpirv-None-06278

[`shaderBufferInt64Atomics`](../../../../spec/latest/chapters/features.html#features-shaderBufferInt64Atomics)
**must** be enabled for 64-bit integer atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `StorageBuffer` or `Uniform`

* 
[](#VUID-RuntimeSpirv-None-06279) VUID-RuntimeSpirv-None-06279

[`shaderSharedInt64Atomics`](../../../../spec/latest/chapters/features.html#features-shaderSharedInt64Atomics)
**must** be enabled for 64-bit integer atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `Workgroup`

* 
[](#VUID-RuntimeSpirv-None-06284) VUID-RuntimeSpirv-None-06284

[    `shaderBufferFloat32Atomics`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat32Atomics), or
[    `shaderBufferFloat32AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat32AtomicAdd), or
[    `shaderBufferFloat64Atomics`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat64Atomics), or
[    `shaderBufferFloat64AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat64AtomicAdd),
or [    `shaderBufferFloat16Atomics`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderBufferFloat16AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderBufferFloat16AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderBufferFloat32AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat32AtomicMinMax), or
[    `shaderBufferFloat64AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat64AtomicMinMax),
or [    `shaderFloat16VectorAtomics`](../../../../spec/latest/chapters/features.html#features-shaderFloat16VectorAtomics)
**must** be enabled for floating-point atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `StorageBuffer`

* 
[](#VUID-RuntimeSpirv-None-06285) VUID-RuntimeSpirv-None-06285

[    `shaderSharedFloat32Atomics`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat32Atomics), or
[    `shaderSharedFloat32AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat32AtomicAdd), or
[    `shaderSharedFloat64Atomics`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat64Atomics), or
[    `shaderSharedFloat64AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat64AtomicAdd),
or [    `shaderSharedFloat16Atomics`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderSharedFloat16AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderSharedFloat16AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderSharedFloat32AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat32AtomicMinMax), or
[    `shaderSharedFloat64AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat64AtomicMinMax),
or [    `shaderFloat16VectorAtomics`](../../../../spec/latest/chapters/features.html#features-shaderFloat16VectorAtomics),
**must** be enabled for floating-point atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `Workgroup`

* 
[](#VUID-RuntimeSpirv-None-06286) VUID-RuntimeSpirv-None-06286

[`shaderImageFloat32Atomics`](../../../../spec/latest/chapters/features.html#features-shaderImageFloat32Atomics),
or [    `shaderImageFloat32AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderImageFloat32AtomicAdd),
or [    `shaderImageFloat32AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderImageFloat32AtomicMinMax),
**must** be enabled for 32-bit floating-point atomic operations to be
supported on a *Pointer* with a `Storage` `Class` of `Image`

* 
[](#VUID-RuntimeSpirv-None-06287) VUID-RuntimeSpirv-None-06287

[`sparseImageFloat32Atomics`](../../../../spec/latest/chapters/features.html#features-sparseImageFloat32Atomics),
or [    `sparseImageFloat32AtomicAdd`](../../../../spec/latest/chapters/features.html#features-sparseImageFloat32AtomicAdd),
or [    `sparseImageFloat32AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-sparseImageFloat32AtomicMinMax),
**must** be enabled for 32-bit floating-point atomics to be supported on
sparse images

* 
[](#VUID-RuntimeSpirv-None-06288) VUID-RuntimeSpirv-None-06288

[`shaderImageInt64Atomics`](../../../../spec/latest/chapters/features.html#features-shaderImageInt64Atomics)
**must** be enabled for 64-bit integer atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `Image`

* 
[](#VUID-RuntimeSpirv-denormBehaviorIndependence-06289) VUID-RuntimeSpirv-denormBehaviorIndependence-06289

If [    `denormBehaviorIndependence`](../../../../spec/latest/chapters/devsandqueues.html#features-denormBehaviorIndependence) is
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY](VkShaderFloatControlsIndependence.html), then the entry
point **must** use the same denormals `Execution` `Mode` for both 16-bit and
64-bit floating-point types

* 
[](#VUID-RuntimeSpirv-denormBehaviorIndependence-06290) VUID-RuntimeSpirv-denormBehaviorIndependence-06290

If [    `denormBehaviorIndependence`](../../../../spec/latest/chapters/devsandqueues.html#features-denormBehaviorIndependence) is
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE](VkShaderFloatControlsIndependence.html), then the entry point
**must** use the same denormals `Execution` `Mode` for all floating-point
types

* 
[](#VUID-RuntimeSpirv-roundingModeIndependence-06291) VUID-RuntimeSpirv-roundingModeIndependence-06291

If [`roundingModeIndependence`](../../../../spec/latest/chapters/devsandqueues.html#features-roundingModeIndependence)
is [VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY](VkShaderFloatControlsIndependence.html), then the
entry point **must** use the same rounding `Execution` `Mode` for both 16-bit
and 64-bit floating-point types

* 
[](#VUID-RuntimeSpirv-roundingModeIndependence-06292) VUID-RuntimeSpirv-roundingModeIndependence-06292

If [`roundingModeIndependence`](../../../../spec/latest/chapters/devsandqueues.html#features-roundingModeIndependence)
is [VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE](VkShaderFloatControlsIndependence.html), then the entry
point **must** use the same rounding `Execution` `Mode` for all floating-point
types

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-06293) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-06293

If [    `shaderSignedZeroInfNanPreserveFloat16`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat16) is [VK_FALSE](VK_FALSE.html), then
`SignedZeroInfNanPreserve` for 16-bit floating-point type **must** not
be used

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-06294) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-06294

If [    `shaderSignedZeroInfNanPreserveFloat32`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat32) is [VK_FALSE](VK_FALSE.html), then
`SignedZeroInfNanPreserve` for 32-bit floating-point type **must** not
be used

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-06295) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-06295

If [    `shaderSignedZeroInfNanPreserveFloat64`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat64) is [VK_FALSE](VK_FALSE.html), then
`SignedZeroInfNanPreserve` for 64-bit floating-point type **must** not
be used

* 
[](#VUID-RuntimeSpirv-shaderDenormPreserveFloat16-06296) VUID-RuntimeSpirv-shaderDenormPreserveFloat16-06296

If [    `shaderDenormPreserveFloat16`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderDenormPreserveFloat16) is [VK_FALSE](VK_FALSE.html), then
`DenormPreserve` for 16-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormPreserveFloat32-06297) VUID-RuntimeSpirv-shaderDenormPreserveFloat32-06297

If [    `shaderDenormPreserveFloat32`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderDenormPreserveFloat32) is [VK_FALSE](VK_FALSE.html), then
`DenormPreserve` for 32-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormPreserveFloat64-06298) VUID-RuntimeSpirv-shaderDenormPreserveFloat64-06298

If [    `shaderDenormPreserveFloat64`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderDenormPreserveFloat64) is [VK_FALSE](VK_FALSE.html), then
`DenormPreserve` for 64-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat16-06299) VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat16-06299

If [    `shaderDenormFlushToZeroFloat16`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderDenormFlushToZeroFloat16) is [VK_FALSE](VK_FALSE.html), then
`DenormFlushToZero` for 16-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat32-06300) VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat32-06300

If [    `shaderDenormFlushToZeroFloat32`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderDenormFlushToZeroFloat32) is [VK_FALSE](VK_FALSE.html), then
`DenormFlushToZero` for 32-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat64-06301) VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat64-06301

If [    `shaderDenormFlushToZeroFloat64`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderDenormFlushToZeroFloat64) is [VK_FALSE](VK_FALSE.html), then
`DenormFlushToZero` for 64-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTEFloat16-06302) VUID-RuntimeSpirv-shaderRoundingModeRTEFloat16-06302

If [    `shaderRoundingModeRTEFloat16`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat16) is [VK_FALSE](VK_FALSE.html), then
`RoundingModeRTE` for 16-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTEFloat32-06303) VUID-RuntimeSpirv-shaderRoundingModeRTEFloat32-06303

If [    `shaderRoundingModeRTEFloat32`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat32) is [VK_FALSE](VK_FALSE.html), then
`RoundingModeRTE` for 32-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTEFloat64-06304) VUID-RuntimeSpirv-shaderRoundingModeRTEFloat64-06304

If [    `shaderRoundingModeRTEFloat64`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat64) is [VK_FALSE](VK_FALSE.html), then
`RoundingModeRTE` for 64-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTZFloat16-06305) VUID-RuntimeSpirv-shaderRoundingModeRTZFloat16-06305

If [    `shaderRoundingModeRTZFloat16`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderRoundingModeRTZFloat16) is [VK_FALSE](VK_FALSE.html), then
`RoundingModeRTZ` for 16-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTZFloat32-06306) VUID-RuntimeSpirv-shaderRoundingModeRTZFloat32-06306

If [    `shaderRoundingModeRTZFloat32`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderRoundingModeRTZFloat32) is [VK_FALSE](VK_FALSE.html), then
`RoundingModeRTZ` for 32-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTZFloat64-06307) VUID-RuntimeSpirv-shaderRoundingModeRTZFloat64-06307

If [    `shaderRoundingModeRTZFloat64`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderRoundingModeRTZFloat64) is [VK_FALSE](VK_FALSE.html), then
`RoundingModeRTZ` for 64-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-09559) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-09559

If [    `shaderSignedZeroInfNanPreserveFloat16`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat16) is [VK_FALSE](VK_FALSE.html) then any
`FPFastMathDefault` execution mode with a type of 16-bit float **must**
include the `NSZ`, `NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-09560) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-09560

If [    `shaderSignedZeroInfNanPreserveFloat16`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat16) is [VK_FALSE](VK_FALSE.html) then any
`FPFastMathMode` decoration on an instruction with result type or any
operand type that includes a 16-bit float **must** include the `NSZ`,
`NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-09561) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-09561

If [    `shaderSignedZeroInfNanPreserveFloat32`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat32) is [VK_FALSE](VK_FALSE.html) then any
`FPFastMathDefault` execution mode with a type of 32-bit float **must**
include the `NSZ`, `NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-09562) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-09562

If [    `shaderSignedZeroInfNanPreserveFloat32`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat32) is [VK_FALSE](VK_FALSE.html) then any
`FPFastMathMode` decoration on an instruction with result type or any
operand type that includes a 32-bit float **must** include the `NSZ`,
`NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-09563) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-09563

If [    `shaderSignedZeroInfNanPreserveFloat64`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat64) is [VK_FALSE](VK_FALSE.html) then any
`FPFastMathDefault` execution mode with a type of 64-bit float **must**
include the `NSZ`, `NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-09564) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-09564

If [    `shaderSignedZeroInfNanPreserveFloat64`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat64) is [VK_FALSE](VK_FALSE.html) then any
`FPFastMathMode` decoration on an instruction with result type or any
operand type that includes a 64-bit float **must** include the `NSZ`,
`NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderFmaFloat16-10977) VUID-RuntimeSpirv-shaderFmaFloat16-10977

[`shaderFmaFloat16`](../../../../spec/latest/chapters/features.html#features-shaderFmaFloat16) **must** be enabled
for `OpFmaKHR` to be supported with a result type that includes a
16-bit float

* 
[](#VUID-RuntimeSpirv-shaderFmaFloat32-10978) VUID-RuntimeSpirv-shaderFmaFloat32-10978

[`shaderFmaFloat32`](../../../../spec/latest/chapters/features.html#features-shaderFmaFloat32) **must** be enabled
for `OpFmaKHR` to be supported with a result type that includes a
32-bit float

* 
[](#VUID-RuntimeSpirv-shaderFmaFloat64-10979) VUID-RuntimeSpirv-shaderFmaFloat64-10979

[`shaderFmaFloat64`](../../../../spec/latest/chapters/features.html#features-shaderFmaFloat64) **must** be enabled
for `OpFmaKHR` to be supported with a result type that includes a
64-bit float

* 
[](#VUID-RuntimeSpirv-Offset-06308) VUID-RuntimeSpirv-Offset-06308

The `Offset` plus size of the type of each variable, in the output
interface of the entry point being compiled, decorated with
`XfbBuffer` **must** not be greater than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](VkPhysicalDeviceTransformFeedbackPropertiesEXT.html)::`maxTransformFeedbackBufferDataSize`

* 
[](#VUID-RuntimeSpirv-XfbBuffer-06309) VUID-RuntimeSpirv-XfbBuffer-06309

For any given `XfbBuffer` value, define the buffer data size to be
smallest number of bytes such that, for all outputs decorated with the
same `XfbBuffer` value, the size of the output interface variable
plus the `Offset` is less than or equal to the buffer data size.
For a given `Stream`, the sum of all the buffer data sizes for all
buffers writing to that stream the **must** not exceed
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](VkPhysicalDeviceTransformFeedbackPropertiesEXT.html)::`maxTransformFeedbackStreamDataSize`

* 
[](#VUID-RuntimeSpirv-OpEmitStreamVertex-06310) VUID-RuntimeSpirv-OpEmitStreamVertex-06310

The Stream value to `OpEmitStreamVertex` and
`OpEndStreamPrimitive` **must** be less than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](VkPhysicalDeviceTransformFeedbackPropertiesEXT.html)::`maxTransformFeedbackStreams`

* 
[](#VUID-RuntimeSpirv-transformFeedbackStreamsLinesTriangles-06311) VUID-RuntimeSpirv-transformFeedbackStreamsLinesTriangles-06311

If the geometry shader emits to more than one vertex stream and
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](VkPhysicalDeviceTransformFeedbackPropertiesEXT.html)::`transformFeedbackStreamsLinesTriangles`
is [VK_FALSE](VK_FALSE.html), then `Execution` `Mode` **must** be `OutputPoints`

* 
[](#VUID-RuntimeSpirv-Stream-06312) VUID-RuntimeSpirv-Stream-06312

The stream number value to `Stream` **must** be less than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](VkPhysicalDeviceTransformFeedbackPropertiesEXT.html)::`maxTransformFeedbackStreams`

* 
[](#VUID-RuntimeSpirv-XfbStride-06313) VUID-RuntimeSpirv-XfbStride-06313

The XFB Stride value to `XfbStride` **must** be less than or equal to
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](VkPhysicalDeviceTransformFeedbackPropertiesEXT.html)::`maxTransformFeedbackBufferDataStride`

* 
[](#VUID-RuntimeSpirv-PhysicalStorageBuffer64-06315) VUID-RuntimeSpirv-PhysicalStorageBuffer64-06315

If the `PhysicalStorageBuffer64` addressing model is enabled the
pointer value of a memory access instruction **must** be at least as
aligned as specified by the `Aligned` memory access operand

* 
[](#VUID-RuntimeSpirv-PhysicalStorageBuffer64-11819) VUID-RuntimeSpirv-PhysicalStorageBuffer64-11819

If the `PhysicalStorageBuffer64` addressing model is enabled the
pointer value of a memory access instruction in the
`PhysicalStorageBuffer` `Storage` `Class` **must** reference a buffer
created with the [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html) usage
flag set

* 
[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixNV-06316) VUID-RuntimeSpirv-OpTypeCooperativeMatrixNV-06316

For `OpTypeCooperativeMatrixNV`, the component type, scope, number of
rows, and number of columns **must** match one of the matrices in any of
the supported [VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)

* 
[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixMulAddNV-10059) VUID-RuntimeSpirv-OpTypeCooperativeMatrixMulAddNV-10059

For `OpTypeCooperativeMatrixMulAddNV`, the operands **must** match a
supported [VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html), such that:

The type of `A` **must** have `Rows` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`KSize`, and
`ComponentType` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`AType`.

* 
The type of `B` **must** have `Rows` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`KSize`, `Columns` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`NSize`, and
`ComponentType` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`BType`.

* 
The type of `C` **must** have `Rows` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`NSize`, and
`ComponentType` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`CType`.

* 
The type of `Result` **must** have `Rows` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`NSize`, and
`ComponentType` match
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)::`DType`.

* 
The scope of all cooperative matrix operands **must** be
[VkScopeNV](VkScopeKHR.html)::[VK_SCOPE_SUBGROUP_NV](VkScopeKHR.html).

* 
If `ComponentType` of `A`, `B`, `C`, or `Result` is a
signed integral type, the `Signedness` operand of the `OpTypeInt`
must be 1.

* 
If `ComponentType` of `A`, `B`, `C`, or `Result` is an
unsigned integral type, the `Signedness` operand of the
`OpTypeInt` must be 0

[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixNV-06322) VUID-RuntimeSpirv-OpTypeCooperativeMatrixNV-06322

`OpTypeCooperativeMatrixNV` and `OpCooperativeMatrix*`
instructions **must** not be used in shader stages not included in
[VkPhysicalDeviceCooperativeMatrixPropertiesNV](VkPhysicalDeviceCooperativeMatrixPropertiesNV.html)::`cooperativeMatrixSupportedStages`

[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10163) VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10163

For `OpTypeCooperativeMatrixKHR`,
if the [    `cooperativeMatrixFlexibleDimensions`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixFlexibleDimensions) feature is not enabled,
the component type, scope, number of rows, and number of columns **must**
match one of the matrices in any of the supported
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html), where

* 
for `Use` of `MatrixA`, the number of rows must match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`MSize` and the number of
columns must match [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`KSize`
and the type **must** match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`AType`

* 
for `Use` of `MatrixB`, the number of rows must match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`KSize` and the number of
columns must match [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`NSize`
and the type **must** match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`BType`

* 
for `Use` of `MatrixAccumulator`, the number of rows must match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`MSize` and the number of
columns must match [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`NSize`
and the type **must** match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`CType` or
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`ResultType`

[](#VUID-RuntimeSpirv-OpCooperativeMatrixMulAddKHR-10060) VUID-RuntimeSpirv-OpCooperativeMatrixMulAddKHR-10060

For `OpCooperativeMatrixMulAddKHR`,
if the [    `cooperativeMatrixFlexibleDimensions`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixFlexibleDimensions) feature is not enabled,
the operands **must** match a supported
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html), such that:

* 
The type of `A` **must** have `Rows` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`KSize`, `Use` be
`MatrixAKHR`, and `ComponentType` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`AType`.

* 
The type of `B` **must** have `Rows` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`KSize`, `Columns` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`NSize`, `Use` be
`MatrixBKHR`, and `ComponentType` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`BType`.

* 
The type of `C` **must** have `Rows` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`NSize`, `Use` be
`MatrixAccumulatorKHR`, and `ComponentType` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`CType`.

* 
The type of `Result` **must** have `Rows` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`NSize`, `Use` be
`MatrixAccumulatorKHR`, and `ComponentType` match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`ResultType`.

* 
If and only if [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`AType` is a
signed integer type, `MatrixASignedComponents` **must** be used.

* 
If and only if [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`BType` is a
signed integer type, `MatrixBSignedComponents` **must** be used.

* 
If and only if [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`CType` is a
signed integer type, `MatrixCSignedComponents` **must** be used.

* 
If and only if [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`ResultType`
is a signed integer type, `MatrixResultSignedComponents` **must** be
used.

* 
If and only if
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`saturatingAccumulation` is
[VK_TRUE](VK_TRUE.html), `SaturatingAccumulationKHR` **must** be used.

* 
If and only if
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`saturatingAccumulation` is
[VK_FALSE](VK_FALSE.html), `SaturatingAccumulationKHR` **must** not be used.

* 
The scope of all cooperative matrix operands **must** match
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`scope`.

[](#VUID-RuntimeSpirv-NSize-12352) VUID-RuntimeSpirv-NSize-12352

For `OpExtractSubArrayQCOM`, the length of the `Source` `Array`
operand **must** match the
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`NSize` of one of the
matrices in any of the supported [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)

[](#VUID-RuntimeSpirv-KSize-12353) VUID-RuntimeSpirv-KSize-12353

For `OpExtractSubArrayQCOM`, the length of the `Result` `Type`
operand **must** match the
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)::`KSize` of one of the
matrices in any of the supported [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)

[](#VUID-RuntimeSpirv-OpExtractSubArrayQCOM-12354) VUID-RuntimeSpirv-OpExtractSubArrayQCOM-12354

For `OpExtractSubArrayQCOM`, the `Start` `Index` operand **must**
be a multiple of the length of the `Result` `Type` operand

[](#VUID-RuntimeSpirv-cooperativeMatrixWorkgroupScope-10164) VUID-RuntimeSpirv-cooperativeMatrixWorkgroupScope-10164

If the [    `cooperativeMatrixWorkgroupScope`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixWorkgroupScope) feature is not enabled, the
scope of all `OpTypeCooperativeMatrixKHR` **must** not be
[VkScopeKHR](VkScopeKHR.html)::[VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html)

[](#VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensions-10165) VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensions-10165

For `OpTypeCooperativeMatrixKHR`, if the
[    `cooperativeMatrixFlexibleDimensions`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixFlexibleDimensions) feature is enabled, the
component type, scope, number of rows, and number of columns **must** match
either one of the matrices in one of the supported
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html) as described above, or one of the
supported [VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html), where

* 
for `MatrixA`, the number of rows must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`MGranularity`
and the number of columns must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`KGranularity`
and the type **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`AType`

* 
for `MatrixB`, the number of rows must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`KGranularity`
and the number of columns must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`NGranularity`
and the type **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`BType`

* 
for `MatrixAccumulator`, the number of rows must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`MGranularity`
and the number of columns must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`NGranularity`
and the type **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`CType` or
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`ResultType`

* 
if the scope is [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html), the number of invocations
in the local workgroup **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`workgroupInvocations`

[](#VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensions-10166) VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensions-10166

For `OpCooperativeMatrixMulAddKHR`, if the
[    `cooperativeMatrixFlexibleDimensions`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixFlexibleDimensions) feature is enabled, the
operands **must** match either one of the supported
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html) as described above, or one of the
supported [VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html), such
that:

* 
The type of `A` **must** have `Rows` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`MGranularity`,
`Columns` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`KGranularity`,
`Use` be `MatrixAKHR`, and `ComponentType` match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`AType`.

* 
The type of `B` **must** have `Rows` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`KGranularity`,
`Columns` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`NGranularity`,
`Use` be `MatrixBKHR`, and `ComponentType` match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`BType`.

* 
The type of `C` **must** have `Rows` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`MGranularity`,
`Columns` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`NGranularity`,
`Use` be `MatrixAccumulatorKHR`, and `ComponentType` match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`CType`.

* 
The type of `Result` **must** have `Rows` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`MGranularity`,
`Columns` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`NGranularity`,
`Use` be `MatrixAccumulatorKHR`, and `ComponentType` match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`ResultType`.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`AType` is
a signed integer type, `MatrixASignedComponents` **must** be used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`BType` is
a signed integer type, `MatrixBSignedComponents` **must** be used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`CType` is
a signed integer type, `MatrixCSignedComponents` **must** be used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`ResultType`
is a signed integer type, `MatrixResultSignedComponents` **must** be
used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`saturatingAccumulation`
is [VK_TRUE](VK_TRUE.html), `SaturatingAccumulationKHR` **must** be used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`saturatingAccumulation`
is [VK_FALSE](VK_FALSE.html), `SaturatingAccumulationKHR` **must** not be used.

* 
The scope of all cooperative matrix operands **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`scope`.

* 
If the scope is [VK_SCOPE_WORKGROUP_KHR](VkScopeKHR.html), the number of invocations
in the local workgroup **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)::`workgroupInvocations`

[](#VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensionsMaxDimension-10167) VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensionsMaxDimension-10167

All `OpTypeCooperativeMatrixKHR` dimensions **must** be less than or
equal to
[`cooperativeMatrixFlexibleDimensionsMaxDimension`](../../../../spec/latest/chapters/limits.html#limits-cooperativeMatrixFlexibleDimensionsMaxDimension)

[](#VUID-RuntimeSpirv-maxComputeSharedMemorySize-10168) VUID-RuntimeSpirv-maxComputeSharedMemorySize-10168

If the module uses `OpTypeCooperativeMatrixKHR` with `Scope` equal
to `Workgroup`, the sum of size in bytes for variables and
[padding](../../../../spec/latest/chapters/shaders.html#workgroup-padding) in the `Workgroup` `Storage` `Class` in
the `GLCompute` `Execution` `Model` **must** be less than or equal to
[`maxComputeSharedMemorySize`](../../../../spec/latest/chapters/limits.html#limits-maxComputeSharedMemorySize)
minus
[`cooperativeMatrixWorkgroupScopeReservedSharedMemory`](../../../../spec/latest/chapters/limits.html#limits-cooperativeMatrixWorkgroupScopeReservedSharedMemory)

[](#VUID-RuntimeSpirv-cooperativeMatrixSupportedStages-08985) VUID-RuntimeSpirv-cooperativeMatrixSupportedStages-08985

`OpTypeCooperativeMatrixKHR` and `OpCooperativeMatrix*`
instructions **must** not be used in shader stages not included in
[VkPhysicalDeviceCooperativeMatrixPropertiesKHR](VkPhysicalDeviceCooperativeMatrixPropertiesKHR.html)::`cooperativeMatrixSupportedStages`

[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10770) VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10770

Any pipeline containing a shader with `OpTypeCooperativeMatrixKHR` or
`OpCooperativeMatrix*KHR` instructions **must** be created with the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html) flag or
the shader module must be version 1.6 or greater

[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10771) VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10771

Any shader object containing `OpTypeCooperativeMatrixKHR` or
`OpCooperativeMatrix*KHR` instructions **must** be created with the
[VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag or the shader
module must be version 1.6 or greater

[](#VUID-RuntimeSpirv-OpCooperativeMatrix-12379) VUID-RuntimeSpirv-OpCooperativeMatrix-12379

If any `OpCooperativeMatrix*` instructions accesses a descriptor, it
**must** not be a null descriptor

[](#VUID-RuntimeSpirv-OpCooperativeMatrixLoadNV-06324) VUID-RuntimeSpirv-OpCooperativeMatrixLoadNV-06324

For `OpCooperativeMatrixLoadNV` and `OpCooperativeMatrixStoreNV`
instructions, the `Pointer` and `Stride` operands **must** be aligned
to at least the lesser of 16 bytes or the natural alignment of a row or
column (depending on `ColumnMajor`) of the matrix (where the natural
alignment is the number of columns/rows multiplied by the component
size)

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10089) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10089

For `OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorMatrixMulAddNV`, the following **must** be satisfied
by the same entry in the [VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html) array
returned by [vkGetPhysicalDeviceCooperativeVectorPropertiesNV](vkGetPhysicalDeviceCooperativeVectorPropertiesNV.html):

* 
The component type of `Input` **must** match
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)::`inputType`

* 
The `InputInterpretation` **must** match
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)::`inputInterpretation`

* 
The `MatrixInterpretation` **must** match
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)::`matrixInterpretation`

* 
For `OpCooperativeVectorMatrixMulAddNV`, the `BiasInterpretation`
**must** match
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)::`biasInterpretation`

* 
The `Result` `Type` **must** match
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)::`resultType`

* 
If `Transpose` is true,
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)::`transpose` **must** be
[VK_TRUE](VK_TRUE.html)

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10090) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10090

For `OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorMatrixMulAddNV`, if `MatrixInterpretation` is
either [VK_COMPONENT_TYPE_FLOAT_E4M3_NV](VkComponentTypeKHR.html) or
[VK_COMPONENT_TYPE_FLOAT_E5M2_NV](VkComponentTypeKHR.html) then `MemoryLayout` **must** be
either [VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_INFERENCING_OPTIMAL_NV](VkCooperativeVectorMatrixLayoutNV.html)
or [VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_TRAINING_OPTIMAL_NV](VkCooperativeVectorMatrixLayoutNV.html)

[](#VUID-RuntimeSpirv-cooperativeVectorSupportedStages-10091) VUID-RuntimeSpirv-cooperativeVectorSupportedStages-10091

`OpTypeCooperativeVectorNV` and `OpCooperativeVector*`
instructions **must** not be used in shader stages not included in
[VkPhysicalDeviceCooperativeVectorPropertiesNV](VkPhysicalDeviceCooperativeVectorPropertiesNV.html)::`cooperativeVectorSupportedStages`

[](#VUID-RuntimeSpirv-OpCooperativeVectorReduceSumAccumulateNV-10092) VUID-RuntimeSpirv-OpCooperativeVectorReduceSumAccumulateNV-10092

For `OpCooperativeVectorReduceSumAccumulateNV`:

* 
The component type of `V` **must** be either 16- or 32-bit
floating-point

* 
If the component type of `V` is 16-bit floating-point,
[     `cooperativeVectorTrainingFloat16Accumulation`](../../../../spec/latest/chapters/limits.html#limits-cooperativeVectorTrainingFloat16Accumulation) **must** be supported

* 
If the component type of `V` is 32-bit floating-point,
[     `cooperativeVectorTrainingFloat32Accumulation`](../../../../spec/latest/chapters/limits.html#limits-cooperativeVectorTrainingFloat32Accumulation) **must** be supported

* 
The pointer’s storage class **must** be `StorageBuffer` or
`PhysicalStorageBuffer`

[](#VUID-RuntimeSpirv-OpCooperativeVectorOuterProductAccumulateNV-10093) VUID-RuntimeSpirv-OpCooperativeVectorOuterProductAccumulateNV-10093

For `OpCooperativeVectorOuterProductAccumulateNV`:

* 
`MatrixInterpretation` must be [VK_COMPONENT_TYPE_FLOAT16_KHR](VkComponentTypeKHR.html)
or [VK_COMPONENT_TYPE_FLOAT32_KHR](VkComponentTypeKHR.html)

* 
If `MatrixInterpretation` is [VK_COMPONENT_TYPE_FLOAT16_KHR](VkComponentTypeKHR.html),
[     `cooperativeVectorTrainingFloat16Accumulation`](../../../../spec/latest/chapters/limits.html#limits-cooperativeVectorTrainingFloat16Accumulation) **must** be supported

* 
If `MatrixInterpretation` is [VK_COMPONENT_TYPE_FLOAT32_KHR](VkComponentTypeKHR.html),
[     `cooperativeVectorTrainingFloat32Accumulation`](../../../../spec/latest/chapters/limits.html#limits-cooperativeVectorTrainingFloat32Accumulation) **must** be supported

* 
The component types of `A` and `B` **must** be 16-bit floating-point

* 
The matrix layout **must** be training-optimal

* 
The pointer’s storage class **must** be `StorageBuffer` or
`PhysicalStorageBuffer`

[](#VUID-RuntimeSpirv-maxCooperativeVectorComponents-10094) VUID-RuntimeSpirv-maxCooperativeVectorComponents-10094

`OpTypeCooperativeVector` instructions **must** have `Component`
`Count` less than or equal to
[    `maxCooperativeVectorComponents`](../../../../spec/latest/chapters/limits.html#limits-maxCooperativeVectorComponents)

[](#VUID-RuntimeSpirv-OpTypeCooperativeVector-10095) VUID-RuntimeSpirv-OpTypeCooperativeVector-10095

`OpTypeCooperativeVector` instructions **must** have `Component`
`Type` that is any supported type reported by
[vkGetPhysicalDeviceCooperativeVectorPropertiesNV](vkGetPhysicalDeviceCooperativeVectorPropertiesNV.html)

[](#VUID-RuntimeSpirv-MeshNV-07113) VUID-RuntimeSpirv-MeshNV-07113

For mesh shaders using the `MeshNV` `Execution` `Model` the
`OutputVertices` `OpExecutionMode` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshOutputVertices`

[](#VUID-RuntimeSpirv-MeshNV-07114) VUID-RuntimeSpirv-MeshNV-07114

For mesh shaders using the `MeshNV` `Execution` `Model` the
`OutputPrimitivesNV` `OpExecutionMode` **must** be less than or equal
to
[VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshOutputPrimitives`

[](#VUID-RuntimeSpirv-MeshEXT-07115) VUID-RuntimeSpirv-MeshEXT-07115

For mesh shaders using the `MeshEXT` `Execution` `Model` the
`OutputVertices` `OpExecutionMode` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputVertices`

[](#VUID-RuntimeSpirv-MeshEXT-07332) VUID-RuntimeSpirv-MeshEXT-07332

For mesh shaders using the `MeshEXT` `Execution` `Model` the “Vertex
Count” operand of `OpSetMeshOutputsEXT` **must** be less than or equal
to `OutputVertices` `OpExecutionMode`

[](#VUID-RuntimeSpirv-MeshEXT-07116) VUID-RuntimeSpirv-MeshEXT-07116

For mesh shaders using the `MeshEXT` `Execution` `Model` the
`OutputPrimitivesEXT` `OpExecutionMode` **must** be less than or
equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputPrimitives`

[](#VUID-RuntimeSpirv-MeshEXT-07333) VUID-RuntimeSpirv-MeshEXT-07333

For mesh shaders using the `MeshEXT` `Execution` `Model` the “Primitive
Count” operand of `OpSetMeshOutputsEXT` **must** be less than or equal
to `OutputPrimitivesEXT` `OpExecutionMode`

[](#VUID-RuntimeSpirv-MeshEXT-12333) VUID-RuntimeSpirv-MeshEXT-12333

For mesh shaders using the `MeshEXT` `Execution` `Model` the index into
the array of any variable decorated with the `PerPrimitiveEXT`
decoration **must** be less than the “Primitive Count” operand of
`OpSetMeshOutputsEXT`

[](#VUID-RuntimeSpirv-TaskEXT-07117) VUID-RuntimeSpirv-TaskEXT-07117

In task shaders using the `TaskEXT` `Execution` `Model`
`OpEmitMeshTasksEXT` **must** be called exactly once under dynamically
uniform conditions

[](#VUID-RuntimeSpirv-MeshEXT-07118) VUID-RuntimeSpirv-MeshEXT-07118

In mesh shaders using the `MeshEXT` `Execution` `Model`
`OpSetMeshOutputsEXT` **must** be called at most once under dynamically
uniform conditions

[](#VUID-RuntimeSpirv-TaskEXT-07291) VUID-RuntimeSpirv-TaskEXT-07291

In task shaders using the `TaskEXT` `Execution` `Model` the `x` size
in `LocalSize` or `LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupSize`[0]

[](#VUID-RuntimeSpirv-TaskEXT-07292) VUID-RuntimeSpirv-TaskEXT-07292

In task shaders using the `TaskEXT` `Execution` `Model` the `y` size
in `LocalSize` or `LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupSize`[1]

[](#VUID-RuntimeSpirv-TaskEXT-07293) VUID-RuntimeSpirv-TaskEXT-07293

In task shaders using the `TaskEXT` `Execution` `Model` the `z` size
in `LocalSize` or `LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupSize`[2]

[](#VUID-RuntimeSpirv-TaskEXT-07294) VUID-RuntimeSpirv-TaskEXT-07294

In task shaders using the `TaskEXT` `Execution` `Model` the product of
`x` size, `y` size, and `z` size in `LocalSize` or
`LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupInvocations`

[](#VUID-RuntimeSpirv-MeshEXT-07295) VUID-RuntimeSpirv-MeshEXT-07295

For mesh shaders using the `MeshEXT` `Execution` `Model` the `x`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupSize`[0]

[](#VUID-RuntimeSpirv-MeshEXT-07296) VUID-RuntimeSpirv-MeshEXT-07296

For mesh shaders using the `MeshEXT` `Execution` `Model` the `y`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupSize`[1]

[](#VUID-RuntimeSpirv-MeshEXT-07297) VUID-RuntimeSpirv-MeshEXT-07297

For mesh shaders using the `MeshEXT` `Execution` `Model` the `z`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupSize`[2]

[](#VUID-RuntimeSpirv-MeshEXT-07298) VUID-RuntimeSpirv-MeshEXT-07298

For mesh shaders using the `MeshEXT` `Execution` `Model` the product of
`x` size, `y` size, and `z` size in `LocalSize` or
`LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupInvocations`

[](#VUID-RuntimeSpirv-TaskEXT-07299) VUID-RuntimeSpirv-TaskEXT-07299

In task shaders using the `TaskEXT` `Execution` `Model` the value of the
“Group Count X” operand of `OpEmitMeshTasksEXT` **must** be less than
or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupCount`[0]

[](#VUID-RuntimeSpirv-TaskEXT-07300) VUID-RuntimeSpirv-TaskEXT-07300

In task shaders using the `TaskEXT` `Execution` `Model` the value of the
“Group Count Y” operand of `OpEmitMeshTasksEXT` **must** be less than
or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupCount`[1]

[](#VUID-RuntimeSpirv-TaskEXT-07301) VUID-RuntimeSpirv-TaskEXT-07301

In task shaders using the `TaskEXT` `Execution` `Model` the value of the
“Group Count Z” operand of `OpEmitMeshTasksEXT` **must** be less than
or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupCount`[2]

[](#VUID-RuntimeSpirv-TaskEXT-07302) VUID-RuntimeSpirv-TaskEXT-07302

In task shaders using the `TaskEXT` `Execution` `Model` the product of
the “Group Count” operands of `OpEmitMeshTasksEXT` **must** be less
than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupTotalCount`

[](#VUID-RuntimeSpirv-maxMeshSharedMemorySize-08754) VUID-RuntimeSpirv-maxMeshSharedMemorySize-08754

The sum of size in bytes for variables and [    padding](../../../../spec/latest/chapters/shaders.html#workgroup-padding) in the `Workgroup` `Storage` `Class` in the `MeshEXT`
`Execution` `Model` **must** be less than or equal to
[`maxMeshSharedMemorySize`](../../../../spec/latest/chapters/limits.html#limits-maxMeshSharedMemorySize)

[](#VUID-RuntimeSpirv-maxMeshPayloadAndSharedMemorySize-08755) VUID-RuntimeSpirv-maxMeshPayloadAndSharedMemorySize-08755

The sum of size in bytes for variables and [    padding](../../../../spec/latest/chapters/shaders.html#workgroup-padding) in the `TaskPayloadWorkgroupEXT` or `Workgroup`
`Storage` `Class` in the `MeshEXT` `Execution` `Model` **must** be less than
or equal to [    `maxMeshPayloadAndSharedMemorySize`](../../../../spec/latest/chapters/limits.html#limits-maxMeshPayloadAndSharedMemorySize)

[](#VUID-RuntimeSpirv-maxMeshOutputMemorySize-08756) VUID-RuntimeSpirv-maxMeshOutputMemorySize-08756

The sum of size in bytes for variables in the `Output` `Storage` `Class`
in the `MeshEXT` `Execution` `Model` **must** be less than or equal to
[`maxMeshOutputMemorySize`](../../../../spec/latest/chapters/limits.html#limits-maxMeshOutputMemorySize)
according to the formula in [Mesh Shader Output](../../../../spec/latest/chapters/VK_NV_mesh_shader/mesh.html#mesh-output)

[](#VUID-RuntimeSpirv-maxMeshPayloadAndOutputMemorySize-08757) VUID-RuntimeSpirv-maxMeshPayloadAndOutputMemorySize-08757

The sum of size in bytes for variables and in the
`TaskPayloadWorkgroupEXT` or `Output` `Storage` `Class` in the
`MeshEXT` `Execution` `Model` **must** be less than or equal to
[    `maxMeshPayloadAndOutputMemorySize`](../../../../spec/latest/chapters/limits.html#limits-maxMeshPayloadAndOutputMemorySize) according to the formula in
[Mesh Shader Output](../../../../spec/latest/chapters/VK_NV_mesh_shader/mesh.html#mesh-output)

[](#VUID-RuntimeSpirv-maxTaskPayloadSize-08758) VUID-RuntimeSpirv-maxTaskPayloadSize-08758

The sum of size in bytes for variables and in the
`TaskPayloadWorkgroupEXT` `Storage` `Class` in the `TaskEXT`
`Execution` `Model` **must** be less than or equal to
[`maxTaskPayloadSize`](../../../../spec/latest/chapters/limits.html#limits-maxTaskPayloadSize)

[](#VUID-RuntimeSpirv-maxTaskSharedMemorySize-08759) VUID-RuntimeSpirv-maxTaskSharedMemorySize-08759

The sum of size in bytes for variables and [    padding](../../../../spec/latest/chapters/shaders.html#workgroup-padding) in the `Workgroup` `Storage` `Class` in the `TaskEXT`
`Execution` `Model` **must** be less than or equal to
[`maxTaskSharedMemorySize`](../../../../spec/latest/chapters/limits.html#limits-maxTaskSharedMemorySize)

[](#VUID-RuntimeSpirv-maxTaskPayloadAndSharedMemorySize-08760) VUID-RuntimeSpirv-maxTaskPayloadAndSharedMemorySize-08760

The sum of size in bytes for variables and [    padding](../../../../spec/latest/chapters/shaders.html#workgroup-padding) in the `TaskPayloadWorkgroupEXT` or `Workgroup`
`Storage` `Class` in the `TaskEXT` `Execution` `Model` **must** be less than
or equal to [    `maxTaskPayloadAndSharedMemorySize`](../../../../spec/latest/chapters/limits.html#limits-maxTaskPayloadAndSharedMemorySize)

[](#VUID-RuntimeSpirv-MeshEXT-12380) VUID-RuntimeSpirv-MeshEXT-12380

If the `MeshEXT` `Execution` `Model` dynamically accesses a variable
with the `TaskPayloadWorkgroupEXT` `Storage` `Class`, there must be a
matching `TaskPayloadWorkgroupEXT` `Storage` `Class` variable in the
`TaskEXT` `Execution` `Model` passed as an argument to
`OpEmitMeshTasksEXT`

[](#VUID-RuntimeSpirv-OpCooperativeMatrixLoadKHR-08986) VUID-RuntimeSpirv-OpCooperativeMatrixLoadKHR-08986

For `OpCooperativeMatrixLoadKHR` and `OpCooperativeMatrixStoreKHR`
instructions, the `Pointer` and `Stride` operands **must** be aligned
to at least the lesser of 16 bytes or the natural alignment of a row or
column (depending on `ColumnMajor`) of the matrix (where the natural
alignment is the number of columns/rows multiplied by the component
size)

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10096) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10096

For `OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorMatrixMulAddNV` instructions using non-optimal
layouts, the `Stride` operand **must** be aligned to 16 bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10097) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10097

For `OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorMatrixMulAddNV` instructions, the `Matrix` and
`MatrixOffset` **must** be aligned to 64 bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulAddNV-10098) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulAddNV-10098

For `OpCooperativeVectorMatrixMulAddNV` instructions, the `Bias`
and `BiasOffset` **must** be aligned to 16 bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorLoadNV-10099) VUID-RuntimeSpirv-OpCooperativeVectorLoadNV-10099

For `OpCooperativeVectorLoadNV` and `OpCooperativeVectorStoreNV`
instructions, the `Pointer` and `Offset` **must** be aligned to 16
bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorReduceSumAccumulateNV-10100) VUID-RuntimeSpirv-OpCooperativeVectorReduceSumAccumulateNV-10100

For `OpCooperativeVectorReduceSumAccumulateNV` instructions, the
`Pointer` and `Offset` **must** be aligned to 16 bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorOuterProductAccumulateNV-10101) VUID-RuntimeSpirv-OpCooperativeVectorOuterProductAccumulateNV-10101

For `OpCooperativeVectorOuterProductAccumulateNV` instructions, the
`Pointer` and `Offset` **must** be aligned to 64 bytes

[](#VUID-RuntimeSpirv-shaderSampleRateInterpolationFunctions-06325) VUID-RuntimeSpirv-shaderSampleRateInterpolationFunctions-06325

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`shaderSampleRateInterpolationFunctions`
is [VK_FALSE](VK_FALSE.html), then `GLSL.std.450` fragment interpolation functions
are not supported by the implementation and `OpCapability` **must** not
be `InterpolationFunction`

[](#VUID-RuntimeSpirv-tessellationShader-06326) VUID-RuntimeSpirv-tessellationShader-06326

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is enabled, and the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is
enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`tessellationIsolines`
is [VK_FALSE](VK_FALSE.html), then `OpExecutionMode` **must** not be `IsoLines`

[](#VUID-RuntimeSpirv-tessellationShader-06327) VUID-RuntimeSpirv-tessellationShader-06327

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is enabled, and the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is
enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`tessellationPointMode`
is [VK_FALSE](VK_FALSE.html), then `OpExecutionMode` **must** not be `PointMode`

[](#VUID-RuntimeSpirv-storageBuffer8BitAccess-06328) VUID-RuntimeSpirv-storageBuffer8BitAccess-06328

If [`storageBuffer8BitAccess`](../../../../spec/latest/chapters/features.html#features-storageBuffer8BitAccess)
is [VK_FALSE](VK_FALSE.html), then objects containing an 8-bit integer element
**must** not have `Storage` `Class` of `StorageBuffer`,
`ShaderRecordBufferKHR`, or `PhysicalStorageBuffer`
unless [`shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers)
is [VK_TRUE](VK_TRUE.html) and they are accessed in:

* 
32-bit multiples, or

* 
16-bit multiples if [     `storageBuffer16BitAccess`](../../../../spec/latest/chapters/features.html#features-storageBuffer16BitAccess) is [VK_TRUE](VK_TRUE.html).

[](#VUID-RuntimeSpirv-uniformAndStorageBuffer8BitAccess-06329) VUID-RuntimeSpirv-uniformAndStorageBuffer8BitAccess-06329

If [    `uniformAndStorageBuffer8BitAccess`](../../../../spec/latest/chapters/features.html#features-uniformAndStorageBuffer8BitAccess) is [VK_FALSE](VK_FALSE.html), then
objects in the `Uniform` `Storage` `Class` with the `Block`
decoration **must** not have an 8-bit integer member
unless [`shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers)
is [VK_TRUE](VK_TRUE.html) and they are accessed in:

* 
32-bit multiples, or

* 
16-bit multiples if [     `uniformAndStorageBuffer16BitAccess`](../../../../spec/latest/chapters/features.html#features-uniformAndStorageBuffer16BitAccess) is [VK_TRUE](VK_TRUE.html).

[](#VUID-RuntimeSpirv-storagePushConstant8-06330) VUID-RuntimeSpirv-storagePushConstant8-06330

If [`storagePushConstant8`](../../../../spec/latest/chapters/features.html#features-storagePushConstant8) is
[VK_FALSE](VK_FALSE.html), then objects containing an 8-bit integer element **must**
not have `Storage` `Class` of `PushConstant`
unless [`shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers)
is [VK_TRUE](VK_TRUE.html) and they are accessed in:

* 
32-bit multiples, or

* 
16-bit multiples if [     `storagePushConstant16`](../../../../spec/latest/chapters/features.html#features-storagePushConstant16) is [VK_TRUE](VK_TRUE.html).

[](#VUID-RuntimeSpirv-workgroupMemoryExplicitLayout8BitAccess-10756) VUID-RuntimeSpirv-workgroupMemoryExplicitLayout8BitAccess-10756

If [    `workgroupMemoryExplicitLayout8BitAccess`](../../../../spec/latest/chapters/features.html#features-workgroupMemoryExplicitLayout8BitAccess) is [VK_FALSE](VK_FALSE.html), then
objects in the `Workgroup` `Storage` `Class` with the `Block`
decoration **must** not have an 8-bit integer element
unless [`shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers)
is [VK_TRUE](VK_TRUE.html) and they are accessed in:

* 
32-bit multiples, or

* 
16-bit multiples if
[     `workgroupMemoryExplicitLayout16BitAccess`](../../../../spec/latest/chapters/features.html#features-workgroupMemoryExplicitLayout16BitAccess) is [VK_TRUE](VK_TRUE.html)

[](#VUID-RuntimeSpirv-storageBuffer16BitAccess-11161) VUID-RuntimeSpirv-storageBuffer16BitAccess-11161

If [`storageBuffer16BitAccess`](../../../../spec/latest/chapters/features.html#features-storageBuffer16BitAccess)
is [VK_FALSE](VK_FALSE.html), then objects containing 16-bit integer or 16-bit
floating-point elements **must** not have `Storage` `Class` of
`StorageBuffer`, `ShaderRecordBufferKHR`, or
`PhysicalStorageBuffer`
unless:

* 
[`storageBuffer8BitAccess`](../../../../spec/latest/chapters/features.html#features-storageBuffer8BitAccess) is
[VK_TRUE](VK_TRUE.html), or

* 
the elements are accessed in 32-bit multiples if
[`shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is
[VK_TRUE](VK_TRUE.html).

[](#VUID-RuntimeSpirv-uniformAndStorageBuffer16BitAccess-06332) VUID-RuntimeSpirv-uniformAndStorageBuffer16BitAccess-06332

If [    `uniformAndStorageBuffer16BitAccess`](../../../../spec/latest/chapters/features.html#features-uniformAndStorageBuffer16BitAccess) is [VK_FALSE](VK_FALSE.html), then
objects in the `Uniform` `Storage` `Class` with the `Block`
decoration **must** not have 16-bit integer or 16-bit floating-point
members
unless:

* 
[     `uniformAndStorageBuffer8BitAccess`](../../../../spec/latest/chapters/features.html#features-uniformAndStorageBuffer8BitAccess) is [VK_TRUE](VK_TRUE.html), or

* 
members are accessed in 32-bit multiples and
[`shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is
[VK_TRUE](VK_TRUE.html)

[](#VUID-RuntimeSpirv-storagePushConstant16-06333) VUID-RuntimeSpirv-storagePushConstant16-06333

If [`storagePushConstant16`](../../../../spec/latest/chapters/features.html#features-storagePushConstant16) is
[VK_FALSE](VK_FALSE.html), then objects containing 16-bit integer or 16-bit
floating-point elements **must** not have `Storage` `Class` of
`PushConstant`
unless:

* 
[`StoragePushConstant8`](../../../../spec/latest/chapters/features.html#features-storagePushConstant8) is
[VK_TRUE](VK_TRUE.html), or

* 
elements are accessed in 32-bit multiples if
[`shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is
[VK_TRUE](VK_TRUE.html)

[](#VUID-RuntimeSpirv-storageInputOutput16-11162) VUID-RuntimeSpirv-storageInputOutput16-11162

If [`storageInputOutput16`](../../../../spec/latest/chapters/features.html#features-storageInputOutput16) is
[VK_FALSE](VK_FALSE.html), then objects containing 16-bit integer or 16-bit
floating-point elements **must** not have storage class of **Input** or
**Output**

[](#VUID-RuntimeSpirv-None-10980) VUID-RuntimeSpirv-None-10980

Objects containing 8-bit integer or 8-bit floating-point elements **must**
not have storage class of **Input** or **Output**

[](#VUID-RuntimeSpirv-workgroupMemoryExplicitLayout16BitAccess-10757) VUID-RuntimeSpirv-workgroupMemoryExplicitLayout16BitAccess-10757

If [    `workgroupMemoryExplicitLayout16BitAccess`](../../../../spec/latest/chapters/features.html#features-workgroupMemoryExplicitLayout16BitAccess) is [VK_FALSE](VK_FALSE.html), then
objects in the `Workgroup` `Storage` `Class` with the `Block`
decoration **must** not have an 16-bit integer or 16-bit floating-point
elements
unless:

* 
[     `workgroupMemoryExplicitLayout8BitAccess`](../../../../spec/latest/chapters/features.html#features-workgroupMemoryExplicitLayout8BitAccess) is [VK_TRUE](VK_TRUE.html), or

* 
elements are accessed in 32-bit multiples if
[`shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is
[VK_TRUE](VK_TRUE.html)

[](#VUID-RuntimeSpirv-None-06337) VUID-RuntimeSpirv-None-06337

[    `shaderBufferFloat16Atomics`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat16Atomics), or
[    `shaderBufferFloat16AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat16AtomicAdd), or
[    `shaderBufferFloat16AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderSharedFloat16Atomics`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat16Atomics), or
[    `shaderSharedFloat16AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat16AtomicAdd), or
[    `shaderSharedFloat16AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat16AtomicMinMax) **must** be enabled for 16-bit
floating-point atomic operations

[](#VUID-RuntimeSpirv-None-06338) VUID-RuntimeSpirv-None-06338

[    `shaderBufferFloat32Atomics`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat32Atomics), or
[    `shaderBufferFloat32AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat32AtomicAdd), or
[    `shaderSharedFloat32Atomics`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat32Atomics), or
[    `shaderSharedFloat32AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat32AtomicAdd), or
[`shaderImageFloat32Atomics`](../../../../spec/latest/chapters/features.html#features-shaderImageFloat32Atomics),
or [    `shaderImageFloat32AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderImageFloat32AtomicAdd) or
[    `shaderBufferFloat32AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat32AtomicMinMax), or
[    `shaderSharedFloat32AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat32AtomicMinMax), or
[    `shaderImageFloat32AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderImageFloat32AtomicMinMax) **must** be enabled for 32-bit
floating-point atomic operations

[](#VUID-RuntimeSpirv-None-06339) VUID-RuntimeSpirv-None-06339

[    `shaderBufferFloat64Atomics`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat64Atomics), or
[    `shaderBufferFloat64AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat64AtomicAdd), or
[    `shaderSharedFloat64Atomics`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat64Atomics), or
[    `shaderSharedFloat64AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat64AtomicAdd), or
[    `shaderBufferFloat64AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderBufferFloat64AtomicMinMax), or
[    `shaderSharedFloat64AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderSharedFloat64AtomicMinMax), **must** be enabled for 64-bit
floating-point atomic operations

[](#VUID-RuntimeSpirv-shaderFloat16VectorAtomics-09581) VUID-RuntimeSpirv-shaderFloat16VectorAtomics-09581

[`shaderFloat16VectorAtomics`](../../../../spec/latest/chapters/features.html#features-shaderFloat16VectorAtomics),
**must** be enabled for 16-bit floating-point, 2- and 4-component vector
atomic operations to be supported

[](#VUID-RuntimeSpirv-NonWritable-06340) VUID-RuntimeSpirv-NonWritable-06340

    If the [    `fragmentStoresAndAtomics`](../../../../spec/latest/chapters/features.html#features-fragmentStoresAndAtomics) feature is not enabled, then all
    storage image, storage texel buffer,
storage tensor,
    and storage buffer variables in the fragment stage **must** be decorated
    with the `NonWritable` decoration

[](#VUID-RuntimeSpirv-NonWritable-06341) VUID-RuntimeSpirv-NonWritable-06341

    If the [    `vertexPipelineStoresAndAtomics`](../../../../spec/latest/chapters/features.html#features-vertexPipelineStoresAndAtomics) feature is not enabled, then all
    storage image, storage texel buffer,
storage tensor,
    and storage buffer variables in the vertex, tessellation, and geometry
    stages **must** be decorated with the `NonWritable` decoration

[](#VUID-RuntimeSpirv-None-06342) VUID-RuntimeSpirv-None-06342

If [    `subgroupQuadOperationsInAllStages`](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupQuadOperationsInAllStages) is [VK_FALSE](VK_FALSE.html), then
[quad subgroup operations](../../../../spec/latest/chapters/limits.html#features-subgroup-quad) **must** not be used
except for in fragment and compute stages

[](#VUID-RuntimeSpirv-None-06343) VUID-RuntimeSpirv-None-06343

[Group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) with
[subgroup scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup) **must** not be used if the
shader stage is not in [    `subgroupSupportedStages`](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSupportedStages)

[](#VUID-RuntimeSpirv-Offset-06344) VUID-RuntimeSpirv-Offset-06344

The first element of the `Offset` operand of `InterpolateAtOffset`
**must** be greater than or equal to:

fragwidth × [    `minInterpolationOffset`](../../../../spec/latest/chapters/limits.html#limits-minInterpolationOffset)

where fragwidth is the width of the current fragment in pixels

[](#VUID-RuntimeSpirv-Offset-06345) VUID-RuntimeSpirv-Offset-06345

The first element of the `Offset` operand of `InterpolateAtOffset`
**must** be less than or equal to

fragwidth × ([    `maxInterpolationOffset`](../../../../spec/latest/chapters/limits.html#limits-maxInterpolationOffset) +  ULP ) - ULP

where fragwidth is the width of the current fragment in pixels
and ULP = 1 / 2^[    `subPixelInterpolationOffsetBits`](../../../../spec/latest/chapters/limits.html#limits-subPixelInterpolationOffsetBits)^

[](#VUID-RuntimeSpirv-Offset-06346) VUID-RuntimeSpirv-Offset-06346

The second element of the `Offset` operand of
`InterpolateAtOffset` **must** be greater than or equal to

fragheight × [    `minInterpolationOffset`](../../../../spec/latest/chapters/limits.html#limits-minInterpolationOffset)

where fragheight is the height of the current fragment in pixels

[](#VUID-RuntimeSpirv-Offset-06347) VUID-RuntimeSpirv-Offset-06347

The second element of the `Offset` operand of
`InterpolateAtOffset` **must** be less than or equal to

fragheight × ([    `maxInterpolationOffset`](../../../../spec/latest/chapters/limits.html#limits-maxInterpolationOffset) +  ULP ) - ULP

where fragheight is the height of the current fragment in pixels
and ULP = 1 / 2^[    `subPixelInterpolationOffsetBits`](../../../../spec/latest/chapters/limits.html#limits-subPixelInterpolationOffsetBits)^

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06348) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06348

For `OpRayQueryInitializeKHR` instructions, all components of the
`RayOrigin` and `RayDirection` operands **must** be finite
floating-point values

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06349) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06349

For `OpRayQueryInitializeKHR` instructions, the `RayTmin` and
`RayTmax` operands **must** be non-negative floating-point values

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06350) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06350

For `OpRayQueryInitializeKHR` instructions, the `RayTmin` operand
**must** be less than or equal to the `RayTmax` operand

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06351) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06351

For `OpRayQueryInitializeKHR` instructions, `RayOrigin`,
`RayDirection`, `RayTmin`, and `RayTmax` operands **must** not
contain NaNs

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06352) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06352

For `OpRayQueryInitializeKHR` instructions, `Acceleration`
`Structure` **must** be an acceleration structure built as a
[top-level acceleration structure](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-top-level)

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06889) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06889

For `OpRayQueryInitializeKHR` instructions, the `Rayflags` operand
**must** not contain both `SkipTrianglesKHR` and `SkipAABBsKHR`

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06890) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06890

For `OpRayQueryInitializeKHR` instructions, the `Rayflags` operand
**must** not contain more than one of `SkipTrianglesKHR`,
`CullBackFacingTrianglesKHR`, and `CullFrontFacingTrianglesKHR`

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06891) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06891

For `OpRayQueryInitializeKHR` instructions, the `Rayflags` operand
**must** not contain more than one of `OpaqueKHR`, `NoOpaqueKHR`,
`CullOpaqueKHR`, and `CullNoOpaqueKHR`

[](#VUID-RuntimeSpirv-OpRayQueryGenerateIntersectionKHR-06353) VUID-RuntimeSpirv-OpRayQueryGenerateIntersectionKHR-06353

For `OpRayQueryGenerateIntersectionKHR` instructions, `Hit` `T`
**must** satisfy the condition `RayTmin` ≤ `Hit` `T`
≤ `RayTmax`, where `RayTmin` is equal to the value returned
by `OpRayQueryGetRayTMinKHR` with the same ray query object, and
`RayTmax` is equal to the value of `OpRayQueryGetIntersectionTKHR`
for the current committed intersection with the same ray query object

[](#VUID-RuntimeSpirv-OpRayQueryGenerateIntersectionKHR-06354) VUID-RuntimeSpirv-OpRayQueryGenerateIntersectionKHR-06354

For `OpRayQueryGenerateIntersectionKHR` instructions,
`Acceleration` `Structure` **must** not be built with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) in `flags`

[](#VUID-RuntimeSpirv-flags-08761) VUID-RuntimeSpirv-flags-08761

For `OpRayQueryGetIntersectionTriangleVertexPositionsKHR`
instructions, `Acceleration` `Structure` **must** have been built
with [VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) in
`flags`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06355) VUID-RuntimeSpirv-OpTraceRayKHR-06355

For `OpTraceRayKHR` instructions, all components of the
`RayOrigin` and `RayDirection` operands **must** be finite
floating-point values

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06356) VUID-RuntimeSpirv-OpTraceRayKHR-06356

For `OpTraceRayKHR` instructions, the `RayTmin` and `RayTmax`
operands **must** be non-negative floating-point values

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06552) VUID-RuntimeSpirv-OpTraceRayKHR-06552

For `OpTraceRayKHR` instructions, the `Rayflags` operand **must** not
contain both `SkipTrianglesKHR` and `SkipAABBsKHR`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06892) VUID-RuntimeSpirv-OpTraceRayKHR-06892

For `OpTraceRayKHR` instructions, the `Rayflags` operand **must** not
contain more than one of `SkipTrianglesKHR`,
`CullBackFacingTrianglesKHR`, and `CullFrontFacingTrianglesKHR`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06893) VUID-RuntimeSpirv-OpTraceRayKHR-06893

For `OpTraceRayKHR` instructions, the `Rayflags` operand **must** not
contain more than one of `OpaqueKHR`, `NoOpaqueKHR`,
`CullOpaqueKHR`, and `CullNoOpaqueKHR`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06553) VUID-RuntimeSpirv-OpTraceRayKHR-06553

For `OpTraceRayKHR` instructions, if the `Rayflags` operand
contains `SkipTrianglesKHR`, the pipeline **must** not have been created
with [VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06554) VUID-RuntimeSpirv-OpTraceRayKHR-06554

For `OpTraceRayKHR` instructions, if the `Rayflags` operand
contains `SkipAABBsKHR`, the pipeline **must** not have been created
with [VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06357) VUID-RuntimeSpirv-OpTraceRayKHR-06357

For `OpTraceRayKHR` instructions, the `RayTmin` operand **must** be
less than or equal to the `RayTmax` operand

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06358) VUID-RuntimeSpirv-OpTraceRayKHR-06358

For `OpTraceRayKHR` instructions, `RayOrigin`, `RayDirection`,
`RayTmin`, and `RayTmax` operands **must** not contain NaNs

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06359) VUID-RuntimeSpirv-OpTraceRayKHR-06359

For `OpTraceRayKHR` instructions, `Acceleration` `Structure`
**must** be an acceleration structure built as a
[top-level acceleration structure](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-top-level)

[](#VUID-RuntimeSpirv-OpReportIntersectionKHR-06998) VUID-RuntimeSpirv-OpReportIntersectionKHR-06998

The value of the “Hit Kind” operand of `OpReportIntersectionKHR`
**must** be in the range [0,127]

[](#VUID-RuntimeSpirv-OpTraceRayKHR-11855) VUID-RuntimeSpirv-OpTraceRayKHR-11855

    For modules which contain `OpTraceRayKHR`
or `OpTraceRayMotionNV`
    instructions that declare a variable in the `RayPayloadKHR`
    `Storage` `Class`, all shaders which may be invoked as part of that *shader
    call* **must** declare an identical variable in the
    `IncomingRayPayloadKHR` `Storage` `Class`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06360) VUID-RuntimeSpirv-OpTraceRayKHR-06360

For `OpTraceRayKHR` instructions, if `Acceleration` `Structure`
was built with [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) in
`flags`, the pipeline **must** have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06361) VUID-RuntimeSpirv-OpTraceRayMotionNV-06361

For `OpTraceRayMotionNV` instructions, all components of the
`RayOrigin` and `RayDirection` operands **must** be finite
floating-point values

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06362) VUID-RuntimeSpirv-OpTraceRayMotionNV-06362

For `OpTraceRayMotionNV` instructions, the `RayTmin` and
`RayTmax` operands **must** be non-negative floating-point values

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06363) VUID-RuntimeSpirv-OpTraceRayMotionNV-06363

For `OpTraceRayMotionNV` instructions, the `RayTmin` operand **must**
be less than or equal to the `RayTmax` operand

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06364) VUID-RuntimeSpirv-OpTraceRayMotionNV-06364

For `OpTraceRayMotionNV` instructions, `RayOrigin`,
`RayDirection`, `RayTmin`, and `RayTmax` operands **must** not
contain NaNs

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06365) VUID-RuntimeSpirv-OpTraceRayMotionNV-06365

For `OpTraceRayMotionNV` instructions, `Acceleration`
`Structure` **must** be an acceleration structure built as a
[top-level acceleration structure](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-top-level)
with [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) in `flags`

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06366) VUID-RuntimeSpirv-OpTraceRayMotionNV-06366

For `OpTraceRayMotionNV` instructions the `time` operand **must** be
between 0.0 and 1.0

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06367) VUID-RuntimeSpirv-OpTraceRayMotionNV-06367

For `OpTraceRayMotionNV` instructions the pipeline **must** have been
created with [VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html)
set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07704) VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07704

For `OpHitObjectTraceRayMotionNV` instructions, if `Acceleration`
`Structure` was built with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) in `flags`, the
pipeline **must** have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07705) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07705

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, all components of the `RayOrigin` and `RayDirection`
operands **must** be finite floating-point values

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07706) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07706

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `RayTmin` and `RayTmax` operands **must** be
non-negative floating-point values

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07707) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07707

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `RayTmin` operand **must** be less than or equal to
the `RayTmax` operand

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07708) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07708

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, `RayOrigin`, `RayDirection`, `RayTmin`, and
`RayTmax` operands **must** not contain NaNs

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07709) VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07709

For `OpHitObjectTraceRayMotionNV` instructions, `Acceleration`
`Structure` **must** be an acceleration structure built as a
[top-level acceleration structure](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-top-level)
with [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) in `flags`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07710) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07710

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions the `time` operand **must** be between 0.0 and 1.0

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07711) VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07711

For `OpHitObjectTraceRayMotionNV` instructions the pipeline **must**
have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07712) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07712

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `Rayflags` operand **must** not contain both
`SkipTrianglesKHR` and `SkipAABBsKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07713) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07713

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `Rayflags` operand **must** not contain more than one
of `SkipTrianglesKHR`, `CullBackFacingTrianglesKHR`, and
`CullFrontFacingTrianglesKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07714) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07714

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `Rayflags` operand **must** not contain more than one
of `OpaqueKHR`, `NoOpaqueKHR`, `CullOpaqueKHR`, and
`CullNoOpaqueKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07715) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07715

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, if the `Rayflags` operand contains
`SkipTrianglesKHR`, the pipeline **must** not have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07716) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07716

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, if the `Rayflags` operand contains `SkipAABBsKHR`,
the pipeline **must** not have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-flags-11875) VUID-RuntimeSpirv-flags-11875

For `OpHitObjectTraceRayMotionEXT` and
`OpHitObjectTraceMotionReorderExecuteEXT` instructions, if
`Acceleration` `Structure` was built with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) in `flags`, the
pipeline **must** have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-flags-11876) VUID-RuntimeSpirv-flags-11876

For `OpHitObjectTraceRayMotionEXT` and
`OpHitObjectTraceMotionReorderExecuteEXT` instructions,
`Acceleration` `Structure` **must** be an acceleration structure
built as a [top-level acceleration    structure](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-top-level) with [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) in
`flags`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayMotionEXT-11877) VUID-RuntimeSpirv-OpHitObjectTraceRayMotionEXT-11877

For `OpHitObjectTraceRayMotionEXT` and
`OpHitObjectTraceMotionReorderExecuteEXT` instructions, the pipeline
**must** have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11878) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11878

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, all components
of the `RayOrigin` and `RayDirection` operands **must** be finite
floating-point values

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11879) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11879

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`RayTmin` and `RayTmax` operands **must** be non-negative
floating-point values

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11880) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11880

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`RayTmin` operand **must** be less than or equal to the `RayTmax`
operand

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11881) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11881

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, `RayOrigin`,
`RayDirection`, `RayTmin`, and `RayTmax` operands **must** not
contain NaNs

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11882) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11882

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions the `time`
operand **must** be between 0.0 and 1.0

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11883) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11883

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`Rayflags` operand **must** not contain both `SkipTrianglesKHR` and
`SkipAABBsKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11884) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11884

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`Rayflags` operand **must** not contain more than one of
`SkipTrianglesKHR`, `CullBackFacingTrianglesKHR`, and
`CullFrontFacingTrianglesKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11885) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11885

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`Rayflags` operand **must** not contain more than one of `OpaqueKHR`,
`NoOpaqueKHR`, `CullOpaqueKHR`, and `CullNoOpaqueKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11886) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11886

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, if the
`Rayflags` operand contains `SkipTrianglesKHR`, the pipeline **must**
not have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11887) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11887

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, if the
`Rayflags` operand contains `SkipAABBsKHR`, the pipeline **must** not
have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html) set

[](#VUID-RuntimeSpirv-x-06429) VUID-RuntimeSpirv-x-06429

In compute shaders using the `GLCompute` `Execution` `Model` the `x`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to [VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxComputeWorkGroupSize`[0]

[](#VUID-RuntimeSpirv-y-06430) VUID-RuntimeSpirv-y-06430

In compute shaders using the `GLCompute` `Execution` `Model` the `y`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to [VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxComputeWorkGroupSize`[1]

[](#VUID-RuntimeSpirv-z-06431) VUID-RuntimeSpirv-z-06431

In compute shaders using the `GLCompute` `Execution` `Model` the `z`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to [VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxComputeWorkGroupSize`[2]

[](#VUID-RuntimeSpirv-x-06432) VUID-RuntimeSpirv-x-06432

In compute shaders using the `GLCompute` `Execution` `Model` the product
of `x` size, `y` size, and `z` size in `LocalSize` or
`LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxComputeWorkGroupInvocations`

[](#VUID-RuntimeSpirv-LocalSizeId-06434) VUID-RuntimeSpirv-LocalSizeId-06434

If `Execution` `Mode` `LocalSizeId` is used, [    `maintenance4`](../../../../spec/latest/chapters/features.html#features-maintenance4) **must** be enabled

[](#VUID-RuntimeSpirv-maintenance4-06817) VUID-RuntimeSpirv-maintenance4-06817

If the [`maintenance4`](../../../../spec/latest/chapters/features.html#features-maintenance4) feature is not
enabled, any vector type output interface variables **must** not have a
higher `Component` `Count` than a matching vector type input
interface variable

[](#VUID-RuntimeSpirv-OpEntryPoint-08743) VUID-RuntimeSpirv-OpEntryPoint-08743

Any [user-defined variables](../../../../spec/latest/chapters/interfaces.html#interfaces-iointerfaces-user) shared
between the `OpEntryPoint` of two shader stages, and declared with
`Input` as its `Storage` `Class` for the subsequent shader stage, **must**
have all `Location` slots and `Component` words declared in the
preceding shader stage’s `OpEntryPoint` with `Output` as the
`Storage` `Class`

[](#VUID-RuntimeSpirv-OpEntryPoint-07754) VUID-RuntimeSpirv-OpEntryPoint-07754

Any [user-defined variables](../../../../spec/latest/chapters/interfaces.html#interfaces-iointerfaces-user) between the
`OpEntryPoint` of two shader stages **must** have the same type and
width for each `Component`

[](#VUID-RuntimeSpirv-OpVariable-08746) VUID-RuntimeSpirv-OpVariable-08746

Any variable, `Block`-decorated `OpTypeStruct`, or
`Block`-decorated `OpTypeStruct` members shared between the
`OpEntryPoint` of two shader stages **must** have matching decorations
as defined in [interface matching](../../../../spec/latest/chapters/interfaces.html#interfaces-iointerfaces-matching)

[](#VUID-RuntimeSpirv-Workgroup-06530) VUID-RuntimeSpirv-Workgroup-06530

The sum of size in bytes for variables and [    padding](../../../../spec/latest/chapters/shaders.html#workgroup-padding) in the `Workgroup` `Storage` `Class` in the `GLCompute`
`Execution` `Model` **must** be less than or equal to
[`maxComputeSharedMemorySize`](../../../../spec/latest/chapters/limits.html#limits-maxComputeSharedMemorySize)

[](#VUID-RuntimeSpirv-shaderZeroInitializeWorkgroupMemory-06372) VUID-RuntimeSpirv-shaderZeroInitializeWorkgroupMemory-06372

If the [    `shaderZeroInitializeWorkgroupMemory`](../../../../spec/latest/chapters/features.html#features-shaderZeroInitializeWorkgroupMemory) feature is not enabled, any
variable with `Workgroup` as its `Storage` `Class` **must** not have an
`Initializer` operand

[](#VUID-RuntimeSpirv-Offset-10213) VUID-RuntimeSpirv-Offset-10213

If the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is not
enabled, image
operand `Offset` **must** only be used with `OpImage*Gather`
instructions

[](#VUID-RuntimeSpirv-Size-11165) VUID-RuntimeSpirv-Size-11165

The `Size` operand of `OpCopyMemorySized` **must** be a multiple of 4

* 
If 16-bit storage is enabled for the storage classes of both the
`Target` and `Source` operands the `Size` operand may instead
be a multiple of 2

* 
If 8-bit storage is enabled for the storage classes of both the
`Target` and `Source` operands the `Size` operand may instead
be any value

[](#VUID-RuntimeSpirv-OpTypeUntypedPointerKHR-11166) VUID-RuntimeSpirv-OpTypeUntypedPointerKHR-11166

Any memory access made using an `OpTypeUntypedPointerKHR` must have
an alignment that satisfies [Offset and    Stride Assignment](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-layout)

[](#VUID-RuntimeSpirv-OpImage-06376) VUID-RuntimeSpirv-OpImage-06376

If an `OpImage*Gather` operation has an image operand of `Offset`,
`ConstOffset`, or `ConstOffsets` the offset value **must** be greater
than or equal to [    `minTexelGatherOffset`](../../../../spec/latest/chapters/limits.html#limits-minTexelGatherOffset)

[](#VUID-RuntimeSpirv-OpImage-06377) VUID-RuntimeSpirv-OpImage-06377

If an `OpImage*Gather` operation has an image operand of `Offset`,
`ConstOffset`, or `ConstOffsets` the offset value **must** be less
than or equal to [    `maxTexelGatherOffset`](../../../../spec/latest/chapters/limits.html#limits-maxTexelGatherOffset)

[](#VUID-RuntimeSpirv-OpImageSample-06435) VUID-RuntimeSpirv-OpImageSample-06435

    If an `OpImageSample*` or `OpImageFetch*` operation has an image
    operand of
`Offset` or
    `ConstOffset` then the offset value **must** be greater than or equal to
    [`minTexelOffset`](../../../../spec/latest/chapters/limits.html#limits-minTexelOffset)

[](#VUID-RuntimeSpirv-OpImageSample-06436) VUID-RuntimeSpirv-OpImageSample-06436

    If an `OpImageSample*` or `OpImageFetch*` operation has an image
    operand of
`Offset` or
    `ConstOffset` then the offset value **must** be less than or equal to
    [`maxTexelOffset`](../../../../spec/latest/chapters/limits.html#limits-maxTexelOffset)

[](#VUID-RuntimeSpirv-samples-08725) VUID-RuntimeSpirv-samples-08725

If an `OpTypeImage` has an `MS` operand 0, its bound image **must**
have been created with [VkImageCreateInfo](VkImageCreateInfo.html)::`samples` as
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

[](#VUID-RuntimeSpirv-samples-08726) VUID-RuntimeSpirv-samples-08726

If an `OpTypeImage` has an `MS` operand 1, its bound image **must**
not have been created with [VkImageCreateInfo](VkImageCreateInfo.html)::`samples` as
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

[](#VUID-RuntimeSpirv-SampleRateShading-06378) VUID-RuntimeSpirv-SampleRateShading-06378

If the subpass description contains
[VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](VkSubpassDescriptionFlagBits.html), then the SPIR-V
fragment shader Capability `SampleRateShading` **must** not be enabled

[](#VUID-RuntimeSpirv-SubgroupUniformControlFlowKHR-06379) VUID-RuntimeSpirv-SubgroupUniformControlFlowKHR-06379

The `Execution` `Mode` `SubgroupUniformControlFlowKHR` **must** not be
applied to an entry point unless the
[    `shaderSubgroupUniformControlFlow`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupUniformControlFlow) feature is enabled, the
corresponding shader stage bit is set in
[`subgroupSupportedStages`](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSupportedStages), and
the entry point does not execute any [*invocation    repack instructions*](../../../../spec/latest/chapters/raytracing.html#ray-tracing-repack)

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06767) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06767

If the [    `shaderEarlyAndLateFragmentTests`](../../../../spec/latest/chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`EarlyAndLateFragmentTestsEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06768) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06768

If the [    `shaderEarlyAndLateFragmentTests`](../../../../spec/latest/chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefUnchangedFrontEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06769) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06769

If the [    `shaderEarlyAndLateFragmentTests`](../../../../spec/latest/chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefUnchangedBackEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06770) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06770

If the [    `shaderEarlyAndLateFragmentTests`](../../../../spec/latest/chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefGreaterFrontEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06771) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06771

If the [    `shaderEarlyAndLateFragmentTests`](../../../../spec/latest/chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefGreaterBackEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06772) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06772

If the [    `shaderEarlyAndLateFragmentTests`](../../../../spec/latest/chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefLessFrontEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06773) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06773

If the [    `shaderEarlyAndLateFragmentTests`](../../../../spec/latest/chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefLessBackEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06979) VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06979

If an `OpImageSampleWeightedQCOM` operation is used, then the
`Texture` `Sampled` `Image` and `Weight` `Image`
parameters **must** both be *dynamically uniform* for the quad

[](#VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06980) VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06980

If an `OpImageSampleWeightedQCOM` operation is used, then the
`Weight` `Image` parameter **must** be of `Storage` `Class`
`UniformConstant` and type `OpTypeImage` with `Depth`=0,
`Dim`=`2D`, `Arrayed`=1, `MS`=0, and `Sampled`=1

[](#VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06981) VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06981

If an `OpImageSampleWeightedQCOM` operation is used, then the
`Weight` `Image` parameter **must** be decorated with
`WeightTextureQCOM`

[](#VUID-RuntimeSpirv-OpImageBlockMatchSADQCOM-06982) VUID-RuntimeSpirv-OpImageBlockMatchSADQCOM-06982

If an `OpImageBlockMatchSADQCOM` or `OpImageBlockMatchSSDQCOM`
operation is used, then the `target` `sampled` `image`,
`reference` `sampled` `image`, and `Block` `Size`
parameters **must** both be *dynamically uniform* for the quad

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06983) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06983

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** be of storage
class `UniformConstant` and type `OpTypeImage` with `Depth`=0,
`Dim`=`2D`, `Arrayed`=0, `MS`=0, and `Sampled`=1

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06984) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06984

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then the `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** be decorated
with `BlockMatchTextureQCOM`

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06985) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06985

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** have been
created using an identical sampler object

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06986) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06986

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** have been
created with a sampler object with `unnormalizedCoordinates` equal
to [VK_TRUE](VK_TRUE.html)

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06987) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06987

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** have been
created with a sampler object with `unnormalizedCoordinates` equal
to [VK_TRUE](VK_TRUE.html)

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06988) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06988

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `Block` `Size` less than or equal to
[`maxBlockMatchRegion`](../../../../spec/latest/chapters/devsandqueues.html#limits-blockmatch-maxblocksize)

[](#VUID-RuntimeSpirv-OpImageBoxFilterQCOM-06989) VUID-RuntimeSpirv-OpImageBoxFilterQCOM-06989

If an `OpImageBoxFilterQCOM` operation is used, then `Box`
`Size.y` **must** be equal to or greater than 1.0 and less than or equal
to [    `maxBoxFilterBlockSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-boxfilter-maxblocksize).`height`

[](#VUID-RuntimeSpirv-OpImageBoxFilterQCOM-06990) VUID-RuntimeSpirv-OpImageBoxFilterQCOM-06990

If an `OpImageBoxFilterQCOM` operation is used, then `Sampled`
`Texture` `Image` and `Box` `Size` parameters **must** be
*dynamically uniform*

[](#VUID-RuntimeSpirv-OpEntryPoint-08727) VUID-RuntimeSpirv-OpEntryPoint-08727

Each `OpEntryPoint` **must** not have more than one variable decorated
with `InputAttachmentIndex` per image aspect of the attachment image
bound to it, either explicitly or implicitly as described by
[input attachment interface](../../../../spec/latest/chapters/interfaces.html#interfaces-inputattachment)

[](#VUID-RuntimeSpirv-minSampleShading-08731) VUID-RuntimeSpirv-minSampleShading-08731

If [sample shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) is enabled and
`minSampleShading` is 1.0, the `sample` operand of any
`OpColorAttachmentReadEXT`, `OpDepthAttachmentReadEXT`, or
`OpStencilAttachmentReadEXT` operation **must** evaluate to the value of
the [coverage index](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask) for any
given fragment invocation

[](#VUID-RuntimeSpirv-minSampleShading-08732) VUID-RuntimeSpirv-minSampleShading-08732

If [sample shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) is enabled and any of the
`OpColorAttachmentReadEXT`, `OpDepthAttachmentReadEXT`, or
`OpStencilAttachmentReadEXT` operations are used, then
`minSampleShading` **must** be 1.0

[](#VUID-RuntimeSpirv-MeshEXT-09218) VUID-RuntimeSpirv-MeshEXT-09218

In mesh shaders using the `MeshEXT` or `MeshNV` `Execution` `Model`
and the `OutputPoints` `Execution` `Mode`,
if the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is not
enabled, and
if the number of output points is greater than 0, a `PointSize`
decorated variable **must** be written to for each output point

[](#VUID-RuntimeSpirv-maintenance5-09190) VUID-RuntimeSpirv-maintenance5-09190

If the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is enabled
and a `PointSize` decorated variable is written to, all execution
paths **must** write to a `PointSize` decorated variable

[](#VUID-RuntimeSpirv-maintenance5-10934) VUID-RuntimeSpirv-maintenance5-10934

If the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is enabled
and a `PointSize` decorated variable is written to for any output
vertex in the `Geometry` `Execution` `Model`, all execution paths for
all output vertices **must** write to a `PointSize` decorated variable

[](#VUID-RuntimeSpirv-ShaderEnqueueAMDX-09191) VUID-RuntimeSpirv-ShaderEnqueueAMDX-09191

The `ShaderEnqueueAMDX` capability **must** only be used in shaders with
the `GLCompute`
or `MeshEXT`
execution model

[](#VUID-RuntimeSpirv-NodePayloadAMDX-09192) VUID-RuntimeSpirv-NodePayloadAMDX-09192

Variables in the `NodePayloadAMDX` storage class **must** only be
declared in the `GLCompute`
or `MeshEXT`
execution model

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09193) VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09193

Variables declared in the `NodePayloadAMDX` storage class **must** not
be larger than the [    `maxExecutionGraphShaderPayloadSize`](../../../../spec/latest/chapters/limits.html#limits-maxExecutionGraphShaderPayloadSize) limit

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09194) VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09194

Variables declared in the `NodeOutputPayloadAMDX` storage class **must**
not be larger than the [    `maxExecutionGraphShaderPayloadSize`](../../../../spec/latest/chapters/limits.html#limits-maxExecutionGraphShaderPayloadSize) limit

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09195) VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09195

For a given entry point, the sum of the size of any variable in the
`NodePayloadAMDX` storage class, and the combined size of all
statically initialized variables in the `NodeOutputPayloadAMDX`
storage class **must** not be greater than
[    `maxExecutionGraphShaderPayloadSize`](../../../../spec/latest/chapters/limits.html#limits-maxExecutionGraphShaderPayloadSize)

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadCount-09196) VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadCount-09196

Shaders **must** not statically initialize more than
[    `maxExecutionGraphShaderPayloadCount`](../../../../spec/latest/chapters/limits.html#limits-maxExecutionGraphShaderPayloadCount) variables in the
`NodeOutputPayloadAMDX` storage class

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderOutputNodes-09197) VUID-RuntimeSpirv-maxExecutionGraphShaderOutputNodes-09197

Shaders **must** not include more than
[    `maxExecutionGraphShaderOutputNodes`](../../../../spec/latest/chapters/limits.html#limits-maxExecutionGraphShaderOutputNodes) instances of
`OpInitializeNodePayloadsAMDX`

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09219) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09219

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then the
`target` `sampled` `image`, `reference` `sampled`
`image`, and `Block` `Size` parameters **must** both be
*dynamically uniform* for the quad

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09220) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09220

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `target`
`sampled` `image` and `reference` `sampled` `image`
parameters **must** be of storage class `UniformConstant` and type
`OpTypeImage` with `Depth`=0, `Dim`=`2D`, `Arrayed`=0,
`MS`=0, and `Sampled`=1

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09221) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09221

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then the
`target` `sampled` `image` and `reference` `sampled`
`image` parameters **must** be decorated with `BlockMatchTextureQCOM`

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09222) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09222

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `target`
`sampled` `image` and `reference` `sampled` `image`
parameters **must** have been created using an identical sampler object

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09223) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09223

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `target`
`sampled` `image` and `reference` `sampled` `image`
parameters **must** have been created with a sampler object with
`unnormalizedCoordinates` equal to [VK_TRUE](VK_TRUE.html)

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09224) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09224

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `target`
`sampled` `image` and `reference` `sampled` `image`
parameters **must** have been created with sampler object with
`unnormalizedCoordinates` equal to [VK_TRUE](VK_TRUE.html)

[](#VUID-RuntimeSpirv-maxBlockMatchRegion-09225) VUID-RuntimeSpirv-maxBlockMatchRegion-09225

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `Block`
`Size` less than or equal to [    `maxBlockMatchRegion`](../../../../spec/latest/chapters/devsandqueues.html#limits-blockmatch-maxblocksize)

[](#VUID-RuntimeSpirv-pNext-09226) VUID-RuntimeSpirv-pNext-09226

If a `OpImageBlockMatchWindow*QCOM` operation is used, then
`target` `sampled` `image` **must** have been created using
asampler object that included
[VkSamplerBlockMatchWindowCreateInfoQCOM](VkSamplerBlockMatchWindowCreateInfoQCOM.html) in the `pNext` chain

[](#VUID-RuntimeSpirv-MaximallyReconvergesKHR-09565) VUID-RuntimeSpirv-MaximallyReconvergesKHR-09565

The execution mode `MaximallyReconvergesKHR` **must** not be applied to
an entry point unless the entry point does not execute any
[*invocation repack instructions*](../../../../spec/latest/chapters/raytracing.html#ray-tracing-repack)

[](#VUID-RuntimeSpirv-shaderSubgroupRotateClustered-09566) VUID-RuntimeSpirv-shaderSubgroupRotateClustered-09566

If [    `shaderSubgroupRotateClustered`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupRotateClustered) is [VK_FALSE](VK_FALSE.html), then the
`ClusterSize` operand to `OpGroupNonUniformRotateKHR` **must** not be
used

[](#VUID-RuntimeSpirv-protectedNoFault-09645) VUID-RuntimeSpirv-protectedNoFault-09645

If [`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the `Storage` `Class` of the `PhysicalStorageBuffer` **must** not be used
if the buffer being accessed is [protected](../../../../spec/latest/chapters/memory.html#memory-protected-memory)

[](#VUID-RuntimeSpirv-meshAndTaskShaderDerivatives-10153) VUID-RuntimeSpirv-meshAndTaskShaderDerivatives-10153

If [    `meshAndTaskShaderDerivatives`](../../../../spec/latest/chapters/limits.html#limits-meshAndTaskShaderDerivatives) is [VK_FALSE](VK_FALSE.html), the
`DerivativeGroupLinearKHR` and `DerivativeGroupQuadsKHR` execution
modes **must** not be used in the `MeshEXT`, `MeshNV`, `TaskEXT`,
or `TaskNV` `Execution` `Model`

[](#VUID-RuntimeSpirv-TileShadingQCOM-10698) VUID-RuntimeSpirv-TileShadingQCOM-10698

`TileShadingQCOM` capability **must** not be declared in the compute
stage unless the [tileShading](../../../../spec/latest/chapters/features.html#features-tileShading) feature is enabled

[](#VUID-RuntimeSpirv-TileShadingQCOM-10699) VUID-RuntimeSpirv-TileShadingQCOM-10699

The `TileShadingQCOM` capability **must** not be declared in the
fragment stage unless the
[tileShadingFragmentStage](../../../../spec/latest/chapters/features.html#features-tileShadingFragmentStage) feature
is enabled

[](#VUID-RuntimeSpirv-TileShadingQCOM-10700) VUID-RuntimeSpirv-TileShadingQCOM-10700

A shader that enables SPIR-V capability `TileShadingQCOM` **must** not
be invoked outside a [tile shading render    pass](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading)

[](#VUID-RuntimeSpirv-TileShadingQCOM-10701) VUID-RuntimeSpirv-TileShadingQCOM-10701

A compute shader that enables SPIR-V capability `TileShadingQCOM`
**must** only be invoked inside those portions of a command buffer where
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

[](#VUID-RuntimeSpirv-x-10702) VUID-RuntimeSpirv-x-10702

In compute shaders that enables SPIR-V capability `TileShadingQCOM`,
the `x` size in `TileShadingRateQCOM` **must** be less than or equal
to [VkPhysicalDeviceTileShadingPropertiesQCOM](VkPhysicalDeviceTileShadingPropertiesQCOM.html).maxTileShadingRate.x

[](#VUID-RuntimeSpirv-y-10703) VUID-RuntimeSpirv-y-10703

In compute shaders that enables SPIR-V capability `TileShadingQCOM`,
the `y` size in `TileShadingRateQCOM` **must** be less than or equal
to [VkPhysicalDeviceTileShadingPropertiesQCOM](VkPhysicalDeviceTileShadingPropertiesQCOM.html).maxTileShadingRate.y

[](#VUID-RuntimeSpirv-z-10704) VUID-RuntimeSpirv-z-10704

In compute shaders that enables SPIR-V capability `TileShadingQCOM`,
the `z` size in `TileShadingRateQCOM` **must** be less than or equal
to [VkTilePropertiesQCOM](VkTilePropertiesQCOM.html).tileSize.z

[](#VUID-RuntimeSpirv-tileSize-10705) VUID-RuntimeSpirv-tileSize-10705

In compute shaders that enables SPIR-V capability `TileShadingQCOM`,
[VkTilePropertiesQCOM](VkTilePropertiesQCOM.html).tileSize.z %
`TileShadingRateQCOM`::`z` **must** equal `0`

[](#VUID-RuntimeSpirv-OpImage-10706) VUID-RuntimeSpirv-OpImage-10706

An `OpImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be consumed by `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
unless the [tileShadingAtomicOps](../../../../spec/latest/chapters/features.html#features-tileShadingFragmentStage)
feature is enabled

[](#VUID-RuntimeSpirv-OpTypeImage-10707) VUID-RuntimeSpirv-OpTypeImage-10707

An `OpTypeImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be backed by a view equivalent to the color attachment of the
current subpass instance unless the
[tileShadingColorAttachments](../../../../spec/latest/chapters/features.html#features-tileShadingColorAttachments)
feature is enabled

[](#VUID-RuntimeSpirv-OpTypeImage-10708) VUID-RuntimeSpirv-OpTypeImage-10708

An `OpTypeImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be backed by a view equivalent to the depth aspect of the
depth/stencil attachment of the current subpass instance unless the
[tileShadingDepthAttachments](../../../../spec/latest/chapters/features.html#features-tileShadingDepthAttachments)

[](#VUID-RuntimeSpirv-OpTypeImage-10709) VUID-RuntimeSpirv-OpTypeImage-10709

An `OpTypeImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be backed by a view equivalent to the stencil aspect of the
depth/stencil attachment of the current subpass instance unless the
[tileShadingStencilAttachments](../../../../spec/latest/chapters/features.html#features-tileShadingStencilAttachments)
feature is enabled

[](#VUID-RuntimeSpirv-OpTypeImage-10710) VUID-RuntimeSpirv-OpTypeImage-10710

An `OpTypeImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be backed by a view equivalent to the input attachment of the
current subpass instance unless the
[tileShadingInputAttachments](../../../../spec/latest/chapters/features.html#features-tileShadingInputAttachments)
feature is enabled

[](#VUID-RuntimeSpirv-OpTypeSampledImage-10711) VUID-RuntimeSpirv-OpTypeSampledImage-10711

An `OpTypeSampledImage` with `Storage` `Class`
`TileAttachmentQCOM` **must** not be backed by a view equivalent to an
attachment of the current subpass instance unless the
[tileShadingSampledAttachments](../../../../spec/latest/chapters/features.html#features-tileShadingSampledAttachments)
feature is enabled

[](#VUID-RuntimeSpirv-tileShadingImageProcessing-10712) VUID-RuntimeSpirv-tileShadingImageProcessing-10712

If an `OpTypeSampledImage` with `Storage` `Class`
`TileAttachmentQCOM` is consumed by any argument of the following
operations,
[`tileShadingImageProcessing`](../../../../spec/latest/chapters/features.html#features-tileShadingImageProcessing)
**must** be enabled:

* 
`OpImageSampleWeightedQCOM`

* 
`OpImageBoxFilterQCOM`

* 
`OpImageBlockMatch*QCOM`

[](#VUID-RuntimeSpirv-Coordinate-10713) VUID-RuntimeSpirv-Coordinate-10713

The `Coordinate` operand of any `OpImageRead`,
`OpImageSparseRead`, `OpImageWrite`,
`OpUntypedImageTexelPointerEXT`
or `OpImageTexelPointer` instruction that consumes an
`OpTypeImage` with an image `Storage` `Class`
`TileAttachmentQCOM` **must** not result in any texels accessed outside
the boundaries of the current tile, computed as described in
[Tile Attachments](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading-offset-validation)

[](#VUID-RuntimeSpirv-Coordinate-10714) VUID-RuntimeSpirv-Coordinate-10714

The `Coordinate` operand(s) of any of the following instructions that
consumes an `OpTypeSampledImage` with an image of `Storage`
`Class` `TileAttachmentQCOM` **must** not result in any texels
accessed outside boundaries of the current tile, computed as described
in [Tile Attachments](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading-offset-validation):

* 
`OpImageSample*`

* 
`OpImageSparseSample*`

* 
`OpImageFetch`

* 
`OpImageSparseFetch`

* 
`OpImage*Gather`

* 
`OpImageSparse*Gather`

* 
`OpImageSampleWeightedQCOM`

* 
`OpImageBoxFilterQCOM`

* 
`OpImageBlockMatch*QCOM`

[](#VUID-RuntimeSpirv-OpTypeSampler-12203) VUID-RuntimeSpirv-OpTypeSampler-12203

If a variable with type `OpTypeSampler` is declared in the
[Shader Resource Interface](../../../../spec/latest/chapters/interfaces.html#interfaces-resources), it **must** not be
backed by a [sampler](../../../../spec/latest/chapters/samplers.html#samplers) that requires
[sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion)

[](#VUID-RuntimeSpirv-OpTypeImage-12204) VUID-RuntimeSpirv-OpTypeImage-12204

If a variable with type `OpTypeImage` is declared in the
[Shader Resource Interface](../../../../spec/latest/chapters/interfaces.html#interfaces-resources), it **must** not be
backed by an [image view](../../../../spec/latest/chapters/resources.html#resources-image-views) that requires
[sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion)

[](#VUID-RuntimeSpirv-None-12205) VUID-RuntimeSpirv-None-12205

If an [image view](../../../../spec/latest/chapters/resources.html#resources-image-views) or [sampler](../../../../spec/latest/chapters/samplers.html#samplers) that
requires [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) is
accessed in a shader, it **must** be determined by
[constant integral expressions](../../../../spec/latest/appendices/glossary.html#glossary-constant-integral-expression)

[](#VUID-RuntimeSpirv-OpTypeSampledImage-12206) VUID-RuntimeSpirv-OpTypeSampledImage-12206

If an `OpTypeSampledImage` variable backed by an
[image view](../../../../spec/latest/chapters/resources.html#resources-image-views) and [sampler](../../../../spec/latest/chapters/samplers.html#samplers) that
require [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) is
statically used in a shader, it **must** only be used with
`OpImageSample*`, `OpImageSparseSample*`, or `OpImage`
instructions

[](#VUID-RuntimeSpirv-OpTypeImage-12207) VUID-RuntimeSpirv-OpTypeImage-12207

If a `OpTypeImage` variable backed by an [    image view](../../../../spec/latest/chapters/resources.html#resources-image-views) that requires [sampler Y′CBCR    conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) is statically used in a shader, it **must** only be used with
`OpImageQueryLevels` or `OpImageQuerySizeLod` instructions

[](#VUID-RuntimeSpirv-ConstOffset-10718) VUID-RuntimeSpirv-ConstOffset-10718

If an `OpTypeSampledImage` variable backed by an
[image view](../../../../spec/latest/chapters/resources.html#resources-image-views) and [sampler](../../../../spec/latest/chapters/samplers.html#samplers) that
require [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) is
statically used in a shader with a sampling instruction, it **must** not
use the `ConstOffset` or `Offset` operands

[](#VUID-RuntimeSpirv-OpTypeSampledImage-12208) VUID-RuntimeSpirv-OpTypeSampledImage-12208

If an `OpTypeSampledImage` variable backed by an
[image view](../../../../spec/latest/chapters/resources.html#resources-image-views) and [sampler](../../../../spec/latest/chapters/samplers.html#samplers) that
require [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) is
statically used in a shader, the image view and sampler **must** have been
created with an *identically defined* [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html) set
via [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html)

[](#VUID-RuntimeSpirv-shaderUniformBufferUnsizedArray-11806) VUID-RuntimeSpirv-shaderUniformBufferUnsizedArray-11806

If the [    `shaderUniformBufferUnsizedArray`](../../../../spec/latest/chapters/features.html#features-shaderUniformBufferUnsizedArray) feature is not enabled,
`OpTypeRuntimeArray` **must** not be used for the last member of a
`Block`-decorated `OpTypeStruct` in the `Uniform` storage
`Storage` `Class`

[](#VUID-RuntimeSpirv-shaderTensorSupportedStages-09901) VUID-RuntimeSpirv-shaderTensorSupportedStages-09901

`OpTypeTensorARM`, `OpTensorReadARM`, `OpTensorWriteARM`, or
`OpTensorQuerySizeARM` **must** not be used in shader stages not in
[`shaderTensorSupportedStages`](../../../../spec/latest/chapters/limits.html#limits-shaderTensorSupportedStages)

[](#VUID-RuntimeSpirv-OpTypeTensorARM-09902) VUID-RuntimeSpirv-OpTypeTensorARM-09902

`OpTypeTensorARM` with a `Shape` **must** not be used in shader
stages

[](#VUID-RuntimeSpirv-OpTypeTensorARM-09907) VUID-RuntimeSpirv-OpTypeTensorARM-09907

`OpTypeTensorARM` without a `Rank` **must** not be used in shader
stages

[](#VUID-RuntimeSpirv-maxTensorShaderAccessArrayLength-09903) VUID-RuntimeSpirv-maxTensorShaderAccessArrayLength-09903

The length of an array returned by `OpTensorReadARM` or passed as the
`Object` operand to `OpTensorWriteARM` **must** be less than or equal
to [    `maxTensorShaderAccessArrayLength`](../../../../spec/latest/chapters/limits.html#limits-maxTensorShaderAccessArrayLength)

[](#VUID-RuntimeSpirv-maxTensorShaderAccessSize-09904) VUID-RuntimeSpirv-maxTensorShaderAccessSize-09904

The total size of the data (number of tensor elements × size of an
element) read or written by one `OpTensorReadARM`, or
`OpTensorWriteARM` instruction, respectively, **must** be less than or
equal to [    `maxTensorShaderAccessSize`](../../../../spec/latest/chapters/limits.html#limits-maxTensorShaderAccessSize)

[](#VUID-RuntimeSpirv-None-10824) VUID-RuntimeSpirv-None-10824

If the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is not
enabled, the
`Base` operand of any `OpBitCount`, `OpBitReverse`,
`OpBitFieldInsert`, `OpBitFieldSExtract`, or
`OpBitFieldUExtract` instruction **must** be a 32-bit integer scalar or
a vector of 32-bit integers

[](#VUID-RuntimeSpirv-GraphARM-09922) VUID-RuntimeSpirv-GraphARM-09922

The `GraphARM` capability **must** not be declared in modules used to
create a shader stage

[](#VUID-RuntimeSpirv-pNext-09919) VUID-RuntimeSpirv-pNext-09919

For each [data graph pipeline](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) created with a
[VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html) structure included in
the `pNext` chain of [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html), the
`OpGraph` that is used by the `OpGraphEntryPointARM` the pipeline
is being created for **must** have an `OpTypeGraphARM` that only uses
`OpTypeTensorARM` with `Shape` present

[](#VUID-RuntimeSpirv-pNext-09920) VUID-RuntimeSpirv-pNext-09920

For each [data graph pipeline](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) created with a
[VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html) structure included in
the `pNext` chain of [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html), all the
`OpGraphConstantARM` with `OpTypeTensorARM` type used by the
`OpGraph` that is used by the `OpGraphEntryPointARM` the pipeline
is being created for **must** have an `OpTypeTensorARM` with `Shape`
present

[](#VUID-RuntimeSpirv-pNext-09921) VUID-RuntimeSpirv-pNext-09921

For each [data graph pipeline](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) created with a
[VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html) structure included in
the `pNext` chain of [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html), one and
only one [VkDataGraphPipelineConstantARM](VkDataGraphPipelineConstantARM.html) structure that satisfies
all the following constraints **must** be present in
[VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html)::`pConstants` for
each `OpGraphConstantARM` used by the `OpGraph` that has a
`OpTypeTensorARM` type and is used by the `OpGraphEntryPointARM`
the pipeline is being created for:

* 
its `id` member **must** match the `GraphConstantID` of the
`OpGraphConstantARM`

* 
its `pNext` chain **must** include a [VkTensorDescriptionARM](VkTensorDescriptionARM.html)
structure

whose `dimensionCount` is equal to the `Rank` of the
`OpTypeTensorARM` of the `OpGraphConstantARM`

* 
whose `pDimensions` array elements are individually and in order
equal to the elements of the array that defines the `Shape` of the
`OpTypeTensorARM` of the `OpGraphConstantARM`

* 
whose `format` [is compatible](../../../../spec/latest/appendices/spirvenv.html#spirvenv-tensor-formats) with the
`ElementType` of the `OpTypeTensorARM` of the
`OpGraphConstantARM`

[](#VUID-RuntimeSpirv-pNext-09923) VUID-RuntimeSpirv-pNext-09923

For each [data graph pipeline](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) created with a
[VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html) structure included in
the `pNext` chain of [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html), one and
only one [VkDataGraphPipelineResourceInfoARM](VkDataGraphPipelineResourceInfoARM.html) structure that
satisfies all the following constraints **must** be present in
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)::`pResourceInfos` for each
`OpVariable` with a `OpTypeTensorARM` type that is part of the
`Interface` of the `OpGraphEntryPointARM` the pipeline is being
created for:

* 
its `descriptorSet` member **must** match the `DescriptorSet`
decoration applied to the `OpVariable`

* 
its `binding` member **must** match the `Binding` decoration
applied to the `OpVariable`

* 
its `arrayElement` member **must** be zero

* 
its `pNext` chain **must** include a [VkTensorDescriptionARM](VkTensorDescriptionARM.html)
structure

whose `dimensionCount` is equal to the `Rank` of the
`OpTypeTensorARM` of the `OpVariable` or its elements

* 
whose `pDimensions` array elements are individually and in order
equal to the elements of the array that defines the `Shape` of the
`OpTypeTensorARM` of the `OpVariable` or its elements

* 
whose `format` [is compatible](../../../../spec/latest/appendices/spirvenv.html#spirvenv-tensor-formats) with the
`ElementType` of the `OpTypeTensorARM` of the `OpVariable`

[](#VUID-RuntimeSpirv-maxShaderBindingTableRecordIndex-11888) VUID-RuntimeSpirv-maxShaderBindingTableRecordIndex-11888

The SBT Index passed in to
`OpHitObjectSetShaderBindingTableRecordIndexEXT` **must** be less than
or equal to
[VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT](VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT.html)::`maxShaderBindingTableRecordIndex`

[](#VUID-RuntimeSpirv-None-10834) VUID-RuntimeSpirv-None-10834

[Buffer indexing calculations](../../../../spec/latest/appendices/spirvenv.html#spirvenv-buffer-indexing) **must** not wrap
32 bits
if the pipeline or shader was not created with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-OpArrayLength-11807) VUID-RuntimeSpirv-OpArrayLength-11807

`OpArrayLength`
and `OpUntypedArrayLengthKHR`
result type **must** be a 32-bit integer type
if the pipeline or shader was not compiled with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-OpConstantSizeOfEXT-11475) VUID-RuntimeSpirv-OpConstantSizeOfEXT-11475

The result type of `OpConstantSizeOfEXT` **must** not be a 64-bit
integer type if the pipeline or shader was not compiled with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulAddNV-11808) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulAddNV-11808

`OpCooperativeVectorMatrixMulAddNV` and
`OpCooperativeVectorMatrixMulNV` `MatrixOffset` and
`BiasOffset` parameters **must** be 32-bit integer types
if the pipeline or shader was not compiled with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-OpCooperativeVectorLoadNV-11809) VUID-RuntimeSpirv-OpCooperativeVectorLoadNV-11809

`OpCooperativeVectorLoadNV`, `OpCooperativeVectorStoreNV`,
`OpCooperativeVectorOuterProductAccumulateNV`, and
`OpCooperativeVectorReduceSumAccumulateNV` `Offset` parameters
**must** be 32-bit integer types
if the pipeline or shader was not compiled with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-longVector-12296) VUID-RuntimeSpirv-longVector-12296

If the [`longVector`](../../../../spec/latest/chapters/features.html#features-longVector) feature is enabled, the
`Component` `Count` of any vector type **must** be less than or equal
to [`maxVectorComponents`](../../../../spec/latest/chapters/limits.html#limits-maxVectorComponents)

[](#VUID-RuntimeSpirv-samplerDescriptorAlignment-11348) VUID-RuntimeSpirv-samplerDescriptorAlignment-11348

If the `Result` `Type` operand of `OpLoad` is
`OpTypeSampler`, and `Pointer` is derived from a variable
decorated with `SamplerHeapEXT`, it **must** be at an offset from the
base that is a multiple of [    `samplerDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorAlignment)

[](#VUID-RuntimeSpirv-imageDescriptorAlignment-11349) VUID-RuntimeSpirv-imageDescriptorAlignment-11349

If the `Result` `Type` operand of `OpLoad` is `OpTypeImage`,
and `Pointer` is derived from a variable decorated with
`ResourceHeapEXT`, it **must** be at an offset from the base that is a
multiple of [    `imageDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-imageDescriptorAlignment)

[](#VUID-RuntimeSpirv-imageDescriptorAlignment-11383) VUID-RuntimeSpirv-imageDescriptorAlignment-11383

If the `Image` operand of `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
is derived from a variable decorated with `ResourceHeapEXT`, it **must**
be at an offset from the base that is a multiple of
[`imageDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-imageDescriptorAlignment)

[](#VUID-RuntimeSpirv-Result-11350) VUID-RuntimeSpirv-Result-11350

If the `Result` `Type` operand of `OpLoad` is
`OpTypeAccelerationStructureKHR` and `Pointer` is derived from a
variable decorated with `ResourceHeapEXT`, it **must** be at an offset
from the base that is a multiple of [    `bufferDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-bufferDescriptorAlignment)

[](#VUID-RuntimeSpirv-bufferDescriptorAlignment-11384) VUID-RuntimeSpirv-bufferDescriptorAlignment-11384

The `Buffer` operand of `OpBufferPointerEXT` **must** be at an offset
from the base of the `ResourceHeapEXT` that is a multiple of
[`bufferDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-bufferDescriptorAlignment)

[](#VUID-RuntimeSpirv-tensorDescriptorAlignment-11481) VUID-RuntimeSpirv-tensorDescriptorAlignment-11481

If the `Result` `Type` operand of `OpLoad` is
`OpTypeTensorARM` and `Pointer` is derived from a variable
decorated with `ResourceHeapEXT`, it **must** be at an offset from the
base that is a multiple of [    `tensorDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-tensorDescriptorAlignment)

[](#VUID-RuntimeSpirv-samplerDescriptorAlignment-11476) VUID-RuntimeSpirv-samplerDescriptorAlignment-11476

If a `OpTypeSampler` member of a struct is decorated with `Offset`
or `OffsetIdEXT`, the `Byte` `Offset` value must be a multiple
of
[`samplerDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorAlignment)

[](#VUID-RuntimeSpirv-imageDescriptorAlignment-11477) VUID-RuntimeSpirv-imageDescriptorAlignment-11477

If a `OpTypeImage` member of a struct is decorated with `Offset`
or `OffsetIdEXT`, the `Byte` `Offset` value must be a multiple
of [`imageDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-imageDescriptorAlignment)

[](#VUID-RuntimeSpirv-bufferDescriptorAlignment-11478) VUID-RuntimeSpirv-bufferDescriptorAlignment-11478

If a `OpTypeBufferEXT` member of a struct is decorated with
`Offset` or `OffsetIdEXT`, the `Byte` `Offset` value must be
a multiple of
[`bufferDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-bufferDescriptorAlignment)

[](#VUID-RuntimeSpirv-bufferDescriptorAlignment-11479) VUID-RuntimeSpirv-bufferDescriptorAlignment-11479

If a `OpTypeAccelerationStructureKHR` member of a struct is decorated
with `Offset` or `OffsetIdEXT`, the `Byte` `Offset` value
must be a multiple of [    `bufferDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-bufferDescriptorAlignment)

[](#VUID-RuntimeSpirv-tensorDescriptorAlignment-11480) VUID-RuntimeSpirv-tensorDescriptorAlignment-11480

If a `OpTypeTensorARM` member of a struct is decorated with
`Offset` or `OffsetIdEXT`, the `Byte` `Offset` value must be
a multiple of [    `tensorDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-tensorDescriptorAlignment)

[](#VUID-RuntimeSpirv-DescriptorSet-11385) VUID-RuntimeSpirv-DescriptorSet-11385

If an instruction accesses memory through any resource with a
`DescriptorSet` and `Binding` that are [    mapped](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), or
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](VkDescriptorMappingSourceEXT.html), the resource
through which that memory is accessed **must** be determined by
[constant integral expressions](../../../../spec/latest/appendices/glossary.html#glossary-constant-integral-expression)

[](#VUID-RuntimeSpirv-source-11387) VUID-RuntimeSpirv-source-11387

All possible values of a variable pointer to a resource that are not
`OpConstantNull` **must** either all be pointers to resources with
`DescriptorSet` and `Binding` decorations with the same
[mapping types](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) as specified by
[VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html)::`source`, or all be
pointers to resources without `DescriptorSet` and `Binding`
decorations

[](#VUID-RuntimeSpirv-DescriptorSet-11388) VUID-RuntimeSpirv-DescriptorSet-11388

All possible values of a variable pointer to a resource **must** not be
resources with a `DescriptorSet` and `Binding` that are
[mapped](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), or
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](VkDescriptorMappingSourceEXT.html)

[](#VUID-RuntimeSpirv-Result-11340) VUID-RuntimeSpirv-Result-11340

If the `Result` `Type` operand of `OpLoad` is
`OpTypeSampler`, and `Pointer` is derived from a variable
decorated with `SamplerHeapEXT`, it **must** correspond to loading a
descriptor matching one of the descriptor types listed in
[Heap Resource Type    Correspondence](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-heap-type-correspondence) for `OpTypeSampler`

[](#VUID-RuntimeSpirv-Result-11341) VUID-RuntimeSpirv-Result-11341

If the `Result` `Type` operand of `OpLoad` is `OpTypeImage`,
and `Pointer` is derived from a variable decorated with
`ResourceHeapEXT`, it **must** correspond to loading a descriptor
matching one of the descriptor types listed in
[Heap Resource Type    Correspondence](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-heap-type-correspondence) for `OpTypeImage`

[](#VUID-RuntimeSpirv-Result-11342) VUID-RuntimeSpirv-Result-11342

The `Buffer` operand of `OpBufferPointerEXT` **must** correspond to
accessing a descriptor matching one of the descriptor types listed in
[Heap Resource Type    Correspondence](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-heap-type-correspondence) for `OpTypePointer`

[](#VUID-RuntimeSpirv-Result-11343) VUID-RuntimeSpirv-Result-11343

If the `Result` `Type` operand of `OpLoad` is `OpTypeImage`,
and `Pointer` is derived from a variable decorated with
`ResourceHeapEXT`, the `Image` `Format` and `Sampled`
`Type` of that `OpTypeImage` **must** correspond to a descriptor with
a [VkFormat](VkFormat.html) that matches as described by [    Compatibility Between SPIR-V Image Formats and Vulkan Formats](../../../../spec/latest/appendices/spirvenv.html#spirvenv-image-formats) and
[Image Format and Type Matching](../../../../spec/latest/appendices/spirvenv.html#spirvenv-format-type-matching)
Between SPIR-V Image Formats and Vulkan Formats>>

[](#VUID-RuntimeSpirv-Result-11345) VUID-RuntimeSpirv-Result-11345

If the `Result` `Type` operand of `OpLoad` is `OpTypeImage`,
and `Pointer` is derived from a variable decorated with
`ResourceHeapEXT`, the operands of that `OpTypeImage` **must**
correspond to a descriptor with operands that match as described by
[Heap Image    Operand Correspondence](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-heap-image-operand-correspondence) and
[Heap Image View    Type Dimensionality](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-heap-image-dim-correspondence)

[](#VUID-RuntimeSpirv-Image-11379) VUID-RuntimeSpirv-Image-11379

If the `Image` operand of `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
is derived from a variable decorated with `ResourceHeapEXT`, it **must**
correspond to accessing a descriptor matching one of the descriptor
types listed in [Heap    Resource Type Correspondence](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-heap-type-correspondence) for the `OpTypeImage` pointed to

[](#VUID-RuntimeSpirv-Image-11380) VUID-RuntimeSpirv-Image-11380

If the `Image` operand of `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
is derived from a variable decorated with `ResourceHeapEXT`, the
`Image` `Format` and `Sampled` `Type` of the
`OpTypeImage` pointed to **must** correspond to a descriptor with a
[VkFormat](VkFormat.html) that matches as described by [    Compatibility Between SPIR-V Image Formats and Vulkan Formats](../../../../spec/latest/appendices/spirvenv.html#spirvenv-image-formats) and
[Image Format and Type Matching](../../../../spec/latest/appendices/spirvenv.html#spirvenv-format-type-matching)

[](#VUID-RuntimeSpirv-Image-11382) VUID-RuntimeSpirv-Image-11382

If the `Image` operand of `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
is derived from a variable decorated with `ResourceHeapEXT`, the
operands of that `OpTypeImage` **must** correspond to a descriptor with
operands that match as described by
[Heap Image    Operand Correspondence](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-heap-image-operand-correspondence) and
[Heap Image View    Type Dimensionality](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-heap-image-dim-correspondence)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
