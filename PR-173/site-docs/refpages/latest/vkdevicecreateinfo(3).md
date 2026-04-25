# VkDeviceCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceCreateInfo - Structure specifying parameters of a newly created device

The `VkDeviceCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDeviceCreateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    VkDeviceCreateFlags                flags;
    uint32_t                           queueCreateInfoCount;
    const VkDeviceQueueCreateInfo*     pQueueCreateInfos;
    // enabledLayerCount is legacy and ignored
    uint32_t                           enabledLayerCount;
    // ppEnabledLayerNames is legacy and ignored
    const char* const*                 ppEnabledLayerNames;
    uint32_t                           enabledExtensionCount;
    const char* const*                 ppEnabledExtensionNames;
    const VkPhysicalDeviceFeatures*    pEnabledFeatures;
} VkDeviceCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`queueCreateInfoCount` is the unsigned integer size of the
`pQueueCreateInfos` array.
Refer to the [Queue Creation](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-queue-creation) section
below for further details.

* 
`pQueueCreateInfos` is a pointer to an array of
[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html) structures describing the queues that are
requested to be created along with the logical device.
Refer to the [Queue Creation](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-queue-creation) section
below for further details.

* 
`enabledLayerCount` is legacy and ignored.
See [Device Layers: Superseded via instance layers](../../../../spec/latest/appendices/legacy.html#legacy-devicelayers).

* 
`ppEnabledLayerNames` is legacy and ignored.
See [Device Layers: Superseded via instance layers](../../../../spec/latest/appendices/legacy.html#legacy-devicelayers).

* 
`enabledExtensionCount` is the number of device extensions to
enable.

* 
`ppEnabledExtensionNames` is a pointer to an array of
`enabledExtensionCount` null-terminated UTF-8 strings containing the
names of extensions to enable for the created device.
See the [Extensions](../../../../spec/latest/chapters/extensions.html#extendingvulkan-extensions) section for further details.

* 
`pEnabledFeatures` is `NULL` or a pointer to a
[VkPhysicalDeviceFeatures](VkPhysicalDeviceFeatures.html) structure containing boolean indicators
of all the features to be enabled.
Refer to the [Features](../../../../spec/latest/chapters/features.html#features) section for further details.
This field is legacy.
See [Physical Device Queries: Superseded via version 2](../../../../spec/latest/appendices/legacy.html#legacy-gpdp2).

Valid Usage

* 
[](#VUID-VkDeviceCreateInfo-queueFamilyIndex-02802) VUID-VkDeviceCreateInfo-queueFamilyIndex-02802

The combination of the values in the `queueFamilyIndex` and
`flags` members of each element of `pQueueCreateInfos` **must** be
unique within `pQueueCreateInfos`

* 
[](#VUID-VkDeviceCreateInfo-pQueueCreateInfos-06755) VUID-VkDeviceCreateInfo-pQueueCreateInfos-06755

If multiple elements of `pQueueCreateInfos` share the same
`queueFamilyIndex`, the sum of their `queueCount` members **must**
be less than or equal to the `queueCount` member of the
`VkQueueFamilyProperties` structure, as returned by
`vkGetPhysicalDeviceQueueFamilyProperties` in the
`pQueueFamilyProperties`[queueFamilyIndex]

* 
[](#VUID-VkDeviceCreateInfo-pQueueCreateInfos-06654) VUID-VkDeviceCreateInfo-pQueueCreateInfos-06654

If multiple elements of `pQueueCreateInfos` share the same
`queueFamilyIndex`, then all of such elements **must** have the same
global priority level, which **can** be specified explicitly by the
including a [VkDeviceQueueGlobalPriorityCreateInfo](VkDeviceQueueGlobalPriorityCreateInfo.html) structure in the
`pNext` chain, or by the implicit default value

* 
[](#VUID-VkDeviceCreateInfo-pNext-00373) VUID-VkDeviceCreateInfo-pNext-00373

If the `pNext` chain includes a [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)
structure, then `pEnabledFeatures` **must** be `NULL`

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-01840) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-01840

If [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` advertises Vulkan
1.1 or later, `ppEnabledExtensionNames` **must** not contain
`[VK_AMD_negative_viewport_height](VK_AMD_negative_viewport_height.html)`

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-00374) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-00374

`ppEnabledExtensionNames` **must** not contain both
`[VK_KHR_maintenance1](VK_KHR_maintenance1.html)` and
`[VK_AMD_negative_viewport_height](VK_AMD_negative_viewport_height.html)`

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-03328) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-03328

`ppEnabledExtensionNames` **must** not contain both
`[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)` and
`[VK_EXT_buffer_device_address](VK_EXT_buffer_device_address.html)`

* 
[](#VUID-VkDeviceCreateInfo-pNext-04748) VUID-VkDeviceCreateInfo-pNext-04748

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html) structure and
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`bufferDeviceAddress` is
[VK_TRUE](VK_TRUE.html), `ppEnabledExtensionNames` **must** not contain
`[VK_EXT_buffer_device_address](VK_EXT_buffer_device_address.html)`

* 
[](#VUID-VkDeviceCreateInfo-pNext-02829) VUID-VkDeviceCreateInfo-pNext-02829

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan11Features](VkPhysicalDeviceVulkan11Features.html) structure, then it **must** not
include a [VkPhysicalDevice16BitStorageFeatures](VkPhysicalDevice16BitStorageFeatures.html),
[VkPhysicalDeviceMultiviewFeatures](VkPhysicalDeviceMultiviewFeatures.html),
[VkPhysicalDeviceVariablePointersFeatures](VkPhysicalDeviceVariablePointersFeatures.html),
[VkPhysicalDeviceProtectedMemoryFeatures](VkPhysicalDeviceProtectedMemoryFeatures.html),
[VkPhysicalDeviceSamplerYcbcrConversionFeatures](VkPhysicalDeviceSamplerYcbcrConversionFeatures.html), or
[VkPhysicalDeviceShaderDrawParametersFeatures](VkPhysicalDeviceShaderDrawParametersFeatures.html) structure

* 
[](#VUID-VkDeviceCreateInfo-pNext-02830) VUID-VkDeviceCreateInfo-pNext-02830

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html) structure, then it **must** not
include a [VkPhysicalDevice8BitStorageFeatures](VkPhysicalDevice8BitStorageFeatures.html),
[VkPhysicalDeviceShaderAtomicInt64Features](VkPhysicalDeviceShaderAtomicInt64Features.html),
[VkPhysicalDeviceShaderFloat16Int8Features](VkPhysicalDeviceShaderFloat16Int8Features.html),
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html),
[VkPhysicalDeviceScalarBlockLayoutFeatures](VkPhysicalDeviceScalarBlockLayoutFeatures.html),
[VkPhysicalDeviceImagelessFramebufferFeatures](VkPhysicalDeviceImagelessFramebufferFeatures.html),
[VkPhysicalDeviceUniformBufferStandardLayoutFeatures](VkPhysicalDeviceUniformBufferStandardLayoutFeatures.html),
[VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures](VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures.html),
[VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures](VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures.html),
[VkPhysicalDeviceHostQueryResetFeatures](VkPhysicalDeviceHostQueryResetFeatures.html),
[VkPhysicalDeviceTimelineSemaphoreFeatures](VkPhysicalDeviceTimelineSemaphoreFeatures.html),
[VkPhysicalDeviceBufferDeviceAddressFeatures](VkPhysicalDeviceBufferDeviceAddressFeatures.html), or
[VkPhysicalDeviceVulkanMemoryModelFeatures](VkPhysicalDeviceVulkanMemoryModelFeatures.html) structure

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-04476) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-04476

If `ppEnabledExtensionNames` contains
`"VK_KHR_shader_draw_parameters"` and the `pNext` chain includes a
[VkPhysicalDeviceVulkan11Features](VkPhysicalDeviceVulkan11Features.html) structure, then
`VkPhysicalDeviceVulkan11Features`::`shaderDrawParameters` **must**
be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02831) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02831

If `ppEnabledExtensionNames` contains `"VK_KHR_draw_indirect_count"`
and the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html) structure, then
`VkPhysicalDeviceVulkan12Features`::`drawIndirectCount` **must** be
[VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02832) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02832

If `ppEnabledExtensionNames` contains
`"VK_KHR_sampler_mirror_clamp_to_edge"` and the `pNext` chain
includes a [VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html) structure, then
`VkPhysicalDeviceVulkan12Features`::`samplerMirrorClampToEdge`
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02833) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02833

If `ppEnabledExtensionNames` contains `"VK_EXT_descriptor_indexing"`
and the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html) structure, then
`VkPhysicalDeviceVulkan12Features`::`descriptorIndexing` **must**
be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02834) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02834

If `ppEnabledExtensionNames` contains
`"VK_EXT_sampler_filter_minmax"` and the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html) structure, then
`VkPhysicalDeviceVulkan12Features`::`samplerFilterMinmax` **must**
be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02835) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02835

If `ppEnabledExtensionNames` contains
`"VK_EXT_shader_viewport_index_layer"` and the `pNext` chain
includes a [VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html) structure, then
`VkPhysicalDeviceVulkan12Features`::`shaderOutputViewportIndex`
and `VkPhysicalDeviceVulkan12Features`::`shaderOutputLayer`
**must** both be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDeviceCreateInfo-pNext-06532) VUID-VkDeviceCreateInfo-pNext-06532

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan13Features](VkPhysicalDeviceVulkan13Features.html) structure, then it **must** not
include a [VkPhysicalDeviceDynamicRenderingFeatures](VkPhysicalDeviceDynamicRenderingFeatures.html),
[VkPhysicalDeviceImageRobustnessFeatures](VkPhysicalDeviceImageRobustnessFeatures.html),
[VkPhysicalDeviceInlineUniformBlockFeatures](VkPhysicalDeviceInlineUniformBlockFeatures.html),
[VkPhysicalDeviceMaintenance4Features](VkPhysicalDeviceMaintenance4Features.html),
[VkPhysicalDevicePipelineCreationCacheControlFeatures](VkPhysicalDevicePipelineCreationCacheControlFeatures.html),
[VkPhysicalDevicePrivateDataFeatures](VkPhysicalDevicePrivateDataFeatures.html),
[VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures](VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures.html),
[VkPhysicalDeviceShaderIntegerDotProductFeatures](VkPhysicalDeviceShaderIntegerDotProductFeatures.html),
[VkPhysicalDeviceShaderTerminateInvocationFeatures](VkPhysicalDeviceShaderTerminateInvocationFeatures.html),
[VkPhysicalDeviceSubgroupSizeControlFeatures](VkPhysicalDeviceSubgroupSizeControlFeatures.html),
[VkPhysicalDeviceSynchronization2Features](VkPhysicalDeviceSynchronization2Features.html),
[VkPhysicalDeviceTextureCompressionASTCHDRFeatures](VkPhysicalDeviceTextureCompressionASTCHDRFeatures.html), or
[VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures](VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures.html) structure

* 
[](#VUID-VkDeviceCreateInfo-pNext-10360) VUID-VkDeviceCreateInfo-pNext-10360

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan14Features](VkPhysicalDeviceVulkan14Features.html) structure, then it **must** not
include a [VkPhysicalDeviceGlobalPriorityQueryFeatures](VkPhysicalDeviceGlobalPriorityQueryFeatures.html),
[VkPhysicalDeviceShaderSubgroupRotateFeatures](VkPhysicalDeviceShaderSubgroupRotateFeatures.html),
[VkPhysicalDeviceShaderFloatControls2Features](VkPhysicalDeviceShaderFloatControls2Features.html),
[VkPhysicalDeviceShaderExpectAssumeFeatures](VkPhysicalDeviceShaderExpectAssumeFeatures.html),
[VkPhysicalDeviceLineRasterizationFeatures](VkPhysicalDeviceLineRasterizationFeatures.html),
[VkPhysicalDeviceVertexAttributeDivisorFeatures](VkPhysicalDeviceVertexAttributeDivisorFeatures.html),
[VkPhysicalDeviceIndexTypeUint8Features](VkPhysicalDeviceIndexTypeUint8Features.html),
[VkPhysicalDeviceDynamicRenderingLocalReadFeatures](VkPhysicalDeviceDynamicRenderingLocalReadFeatures.html),
[VkPhysicalDeviceMaintenance5Features](VkPhysicalDeviceMaintenance5Features.html),
[VkPhysicalDeviceMaintenance6Features](VkPhysicalDeviceMaintenance6Features.html),
[VkPhysicalDevicePipelineProtectedAccessFeatures](VkPhysicalDevicePipelineProtectedAccessFeatures.html),
[VkPhysicalDevicePipelineRobustnessFeatures](VkPhysicalDevicePipelineRobustnessFeatures.html), or
[VkPhysicalDeviceHostImageCopyFeatures](VkPhysicalDeviceHostImageCopyFeatures.html) structure

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-10858) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-10858

If `ppEnabledExtensionNames` contains `"VK_KHR_push_descriptor"` and
the `pNext` chain includes a [VkPhysicalDeviceVulkan14Features](VkPhysicalDeviceVulkan14Features.html)
structure, then
`VkPhysicalDeviceVulkan14Features`::`pushDescriptor` **must** be
[VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDeviceCreateInfo-pProperties-04451) VUID-VkDeviceCreateInfo-pProperties-04451

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is included in
`pProperties` of [vkEnumerateDeviceExtensionProperties](vkEnumerateDeviceExtensionProperties.html),
`ppEnabledExtensionNames` **must** include
`"VK_KHR_portability_subset"`

* 
[](#VUID-VkDeviceCreateInfo-shadingRateImage-04478) VUID-VkDeviceCreateInfo-shadingRateImage-04478

If the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature is
enabled, the [    `pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-shadingRateImage-04479) VUID-VkDeviceCreateInfo-shadingRateImage-04479

If the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature is
enabled, the [    `primitiveFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-primitiveFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-shadingRateImage-04480) VUID-VkDeviceCreateInfo-shadingRateImage-04480

If the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature is
enabled, the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-fragmentDensityMap-04481) VUID-VkDeviceCreateInfo-fragmentDensityMap-04481

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is enabled, the [    `pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-fragmentDensityMap-04482) VUID-VkDeviceCreateInfo-fragmentDensityMap-04482

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is enabled, the [    `primitiveFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-primitiveFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-fragmentDensityMap-04483) VUID-VkDeviceCreateInfo-fragmentDensityMap-04483

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is enabled, the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-None-04896) VUID-VkDeviceCreateInfo-None-04896

If the [    `sparseImageInt64Atomics`](../../../../spec/latest/chapters/features.html#features-sparseImageInt64Atomics) feature is enabled,
[`shaderImageInt64Atomics`](../../../../spec/latest/chapters/features.html#features-shaderImageInt64Atomics)
**must** be enabled

* 
[](#VUID-VkDeviceCreateInfo-None-04897) VUID-VkDeviceCreateInfo-None-04897

If the [    `sparseImageFloat32Atomics`](../../../../spec/latest/chapters/features.html#features-sparseImageFloat32Atomics) feature is enabled,
[`shaderImageFloat32Atomics`](../../../../spec/latest/chapters/features.html#features-shaderImageFloat32Atomics)
**must** be enabled

* 
[](#VUID-VkDeviceCreateInfo-None-04898) VUID-VkDeviceCreateInfo-None-04898

If the [    `sparseImageFloat32AtomicAdd`](../../../../spec/latest/chapters/features.html#features-sparseImageFloat32AtomicAdd) feature is enabled,
[    `shaderImageFloat32AtomicAdd`](../../../../spec/latest/chapters/features.html#features-shaderImageFloat32AtomicAdd) **must** be enabled

* 
[](#VUID-VkDeviceCreateInfo-sparseImageFloat32AtomicMinMax-04975) VUID-VkDeviceCreateInfo-sparseImageFloat32AtomicMinMax-04975

If the [    `sparseImageFloat32AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-sparseImageFloat32AtomicMinMax) feature is enabled,
[    `shaderImageFloat32AtomicMinMax`](../../../../spec/latest/chapters/features.html#features-shaderImageFloat32AtomicMinMax) **must** be enabled

* 
[](#VUID-VkDeviceCreateInfo-robustBufferAccess-10247) VUID-VkDeviceCreateInfo-robustBufferAccess-10247

If the [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature
is enabled, and [    `robustBufferAccessUpdateAfterBind`](../../../../spec/latest/chapters/devsandqueues.html#limits-robustBufferAccessUpdateAfterBind) is [VK_FALSE](VK_FALSE.html), then
[    `descriptorBindingUniformBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingUniformBufferUpdateAfterBind),
[    `descriptorBindingStorageBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageBufferUpdateAfterBind),
[    `descriptorBindingUniformTexelBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingUniformTexelBufferUpdateAfterBind), and
[    `descriptorBindingStorageTexelBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageTexelBufferUpdateAfterBind) **must** not be
enabled

* 
[](#VUID-VkDeviceCreateInfo-None-08095) VUID-VkDeviceCreateInfo-None-08095

If the [`descriptorBuffer`](../../../../spec/latest/chapters/features.html#features-descriptorBuffer) feature is
enabled, `ppEnabledExtensionNames` **must** not contain
`[VK_AMD_shader_fragment_mask](VK_AMD_shader_fragment_mask.html)`

* 
[](#VUID-VkDeviceCreateInfo-pNext-09396) VUID-VkDeviceCreateInfo-pNext-09396

If the `pNext` chain includes a
[VkDeviceQueueShaderCoreControlCreateInfoARM](VkDeviceQueueShaderCoreControlCreateInfoARM.html) structure, then it
**must** not be included in the `pNext` chain of any of the
[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html) structures in `pQueueCreateInfos`

* 
[](#VUID-VkDeviceCreateInfo-pNext-09397) VUID-VkDeviceCreateInfo-pNext-09397

If the `pNext` chain includes a
[VkDeviceQueueShaderCoreControlCreateInfoARM](VkDeviceQueueShaderCoreControlCreateInfoARM.html) structure then
[VkPhysicalDeviceSchedulingControlsPropertiesARM](VkPhysicalDeviceSchedulingControlsPropertiesARM.html)::`schedulingControlsFlags`
**must** contain
[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_SHADER_CORE_COUNT_ARM](VkPhysicalDeviceSchedulingControlsFlagBitsARM.html)

* 
[](#VUID-VkDeviceCreateInfo-None-10778) VUID-VkDeviceCreateInfo-None-10778

If the [maintenance9](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is not supported,
`queueCreateInfoCount` **must** be greater than `0`

* 
[](#VUID-VkDeviceCreateInfo-queueFamilyIndex-11831) VUID-VkDeviceCreateInfo-queueFamilyIndex-11831

If any element of pQueueCreateInfos specifies a `queueFamilyIndex`
that supports [VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html) and that
`queueFamilyIndex` enumerates an engine through
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html) with
`type`
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)
or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html),
a [VkPhysicalDeviceDataGraphModelFeaturesQCOM](VkPhysicalDeviceDataGraphModelFeaturesQCOM.html) structure **must** be
included in `pNext` with [    dataGraphModel](../../../../spec/latest/chapters/features.html#features-dataGraphModelQCOM) set to [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDeviceCreateInfo-deviceAddressCommands-13048) VUID-VkDeviceCreateInfo-deviceAddressCommands-13048

If the [`deviceAddressCommands`](../../../../spec/latest/chapters/features.html#features-deviceAddressCommands)
feature is enabled, the [    `accelerationStructureHostCommands`](../../../../spec/latest/chapters/features.html#features-accelerationStructureHostCommands) feature **must** not be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceCreateInfo-sType-sType) VUID-VkDeviceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDeviceCreateInfo-pNext-pNext) VUID-VkDeviceCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceDeviceMemoryReportCreateInfoEXT](VkDeviceDeviceMemoryReportCreateInfoEXT.html), [VkDeviceDiagnosticsConfigCreateInfoNV](VkDeviceDiagnosticsConfigCreateInfoNV.html), [VkDeviceGroupDeviceCreateInfo](VkDeviceGroupDeviceCreateInfo.html), [VkDeviceMemoryOverallocationCreateInfoAMD](VkDeviceMemoryOverallocationCreateInfoAMD.html), [VkDevicePipelineBinaryInternalCacheControlKHR](VkDevicePipelineBinaryInternalCacheControlKHR.html), [VkDevicePrivateDataCreateInfo](VkDevicePrivateDataCreateInfo.html), [VkDeviceQueueShaderCoreControlCreateInfoARM](VkDeviceQueueShaderCoreControlCreateInfoARM.html), [VkExternalComputeQueueDeviceCreateInfoNV](VkExternalComputeQueueDeviceCreateInfoNV.html), [VkPhysicalDevice16BitStorageFeatures](VkPhysicalDevice16BitStorageFeatures.html), [VkPhysicalDevice4444FormatsFeaturesEXT](VkPhysicalDevice4444FormatsFeaturesEXT.html), [VkPhysicalDevice8BitStorageFeatures](VkPhysicalDevice8BitStorageFeatures.html), [VkPhysicalDeviceASTCDecodeFeaturesEXT](VkPhysicalDeviceASTCDecodeFeaturesEXT.html), [VkPhysicalDeviceAccelerationStructureFeaturesKHR](VkPhysicalDeviceAccelerationStructureFeaturesKHR.html), [VkPhysicalDeviceAddressBindingReportFeaturesEXT](VkPhysicalDeviceAddressBindingReportFeaturesEXT.html), [VkPhysicalDeviceAmigoProfilingFeaturesSEC](VkPhysicalDeviceAmigoProfilingFeaturesSEC.html), [VkPhysicalDeviceAntiLagFeaturesAMD](VkPhysicalDeviceAntiLagFeaturesAMD.html), [VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT](VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT.html), [VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT](VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT.html), [VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT](VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT.html), [VkPhysicalDeviceBorderColorSwizzleFeaturesEXT](VkPhysicalDeviceBorderColorSwizzleFeaturesEXT.html), [VkPhysicalDeviceBufferDeviceAddressFeatures](VkPhysicalDeviceBufferDeviceAddressFeatures.html), [VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](VkPhysicalDeviceBufferDeviceAddressFeaturesEXT.html), [VkPhysicalDeviceClusterAccelerationStructureFeaturesNV](VkPhysicalDeviceClusterAccelerationStructureFeaturesNV.html), [VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI](VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI.html), [VkPhysicalDeviceCoherentMemoryFeaturesAMD](VkPhysicalDeviceCoherentMemoryFeaturesAMD.html), [VkPhysicalDeviceColorWriteEnableFeaturesEXT](VkPhysicalDeviceColorWriteEnableFeaturesEXT.html), [VkPhysicalDeviceCommandBufferInheritanceFeaturesNV](VkPhysicalDeviceCommandBufferInheritanceFeaturesNV.html), [VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV](VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV.html), [VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR](VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR.html), [VkPhysicalDeviceConditionalRenderingFeaturesEXT](VkPhysicalDeviceConditionalRenderingFeaturesEXT.html), [VkPhysicalDeviceCooperativeMatrix2FeaturesNV](VkPhysicalDeviceCooperativeMatrix2FeaturesNV.html), [VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM](VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM.html), [VkPhysicalDeviceCooperativeMatrixFeaturesKHR](VkPhysicalDeviceCooperativeMatrixFeaturesKHR.html), [VkPhysicalDeviceCooperativeMatrixFeaturesNV](VkPhysicalDeviceCooperativeMatrixFeaturesNV.html), [VkPhysicalDeviceCooperativeVectorFeaturesNV](VkPhysicalDeviceCooperativeVectorFeaturesNV.html), [VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR](VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR.html), [VkPhysicalDeviceCopyMemoryIndirectFeaturesNV](VkPhysicalDeviceCopyMemoryIndirectFeaturesNV.html), [VkPhysicalDeviceCornerSampledImageFeaturesNV](VkPhysicalDeviceCornerSampledImageFeaturesNV.html), [VkPhysicalDeviceCoverageReductionModeFeaturesNV](VkPhysicalDeviceCoverageReductionModeFeaturesNV.html), [VkPhysicalDeviceCubicClampFeaturesQCOM](VkPhysicalDeviceCubicClampFeaturesQCOM.html), [VkPhysicalDeviceCubicWeightsFeaturesQCOM](VkPhysicalDeviceCubicWeightsFeaturesQCOM.html), [VkPhysicalDeviceCudaKernelLaunchFeaturesNV](VkPhysicalDeviceCudaKernelLaunchFeaturesNV.html), [VkPhysicalDeviceCustomBorderColorFeaturesEXT](VkPhysicalDeviceCustomBorderColorFeaturesEXT.html), [VkPhysicalDeviceCustomResolveFeaturesEXT](VkPhysicalDeviceCustomResolveFeaturesEXT.html), [VkPhysicalDeviceDataGraphFeaturesARM](VkPhysicalDeviceDataGraphFeaturesARM.html), [VkPhysicalDeviceDataGraphModelFeaturesQCOM](VkPhysicalDeviceDataGraphModelFeaturesQCOM.html), [VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV](VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV.html), [VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX](VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX.html), [VkPhysicalDeviceDepthBiasControlFeaturesEXT](VkPhysicalDeviceDepthBiasControlFeaturesEXT.html), [VkPhysicalDeviceDepthClampControlFeaturesEXT](VkPhysicalDeviceDepthClampControlFeaturesEXT.html), [VkPhysicalDeviceDepthClampZeroOneFeaturesKHR](VkPhysicalDeviceDepthClampZeroOneFeaturesKHR.html), [VkPhysicalDeviceDepthClipControlFeaturesEXT](VkPhysicalDeviceDepthClipControlFeaturesEXT.html), [VkPhysicalDeviceDepthClipEnableFeaturesEXT](VkPhysicalDeviceDepthClipEnableFeaturesEXT.html), [VkPhysicalDeviceDescriptorBufferFeaturesEXT](VkPhysicalDeviceDescriptorBufferFeaturesEXT.html), [VkPhysicalDeviceDescriptorBufferTensorFeaturesARM](VkPhysicalDeviceDescriptorBufferTensorFeaturesARM.html), [VkPhysicalDeviceDescriptorHeapFeaturesEXT](VkPhysicalDeviceDescriptorHeapFeaturesEXT.html), [VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html), [VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV](VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV.html), [VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE](VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE.html), [VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR](VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR.html), [VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV](VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV.html), [VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT](VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT.html), [VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV](VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV.html), [VkPhysicalDeviceDeviceMemoryReportFeaturesEXT](VkPhysicalDeviceDeviceMemoryReportFeaturesEXT.html), [VkPhysicalDeviceDiagnosticsConfigFeaturesNV](VkPhysicalDeviceDiagnosticsConfigFeaturesNV.html), [VkPhysicalDeviceDisplacementMicromapFeaturesNV](VkPhysicalDeviceDisplacementMicromapFeaturesNV.html), [VkPhysicalDeviceDynamicRenderingFeatures](VkPhysicalDeviceDynamicRenderingFeatures.html), [VkPhysicalDeviceDynamicRenderingLocalReadFeatures](VkPhysicalDeviceDynamicRenderingLocalReadFeatures.html), [VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT](VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT.html), [VkPhysicalDeviceExclusiveScissorFeaturesNV](VkPhysicalDeviceExclusiveScissorFeaturesNV.html), [VkPhysicalDeviceExtendedDynamicState2FeaturesEXT](VkPhysicalDeviceExtendedDynamicState2FeaturesEXT.html), [VkPhysicalDeviceExtendedDynamicState3FeaturesEXT](VkPhysicalDeviceExtendedDynamicState3FeaturesEXT.html), [VkPhysicalDeviceExtendedDynamicStateFeaturesEXT](VkPhysicalDeviceExtendedDynamicStateFeaturesEXT.html), [VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV](VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV.html), [VkPhysicalDeviceExternalFormatResolveFeaturesANDROID](VkPhysicalDeviceExternalFormatResolveFeaturesANDROID.html), [VkPhysicalDeviceExternalMemoryRDMAFeaturesNV](VkPhysicalDeviceExternalMemoryRDMAFeaturesNV.html), [VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX](VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX.html), [VkPhysicalDeviceFaultFeaturesEXT](VkPhysicalDeviceFaultFeaturesEXT.html), [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkPhysicalDeviceFormatPackFeaturesARM](VkPhysicalDeviceFormatPackFeaturesARM.html), [VkPhysicalDeviceFragmentDensityMap2FeaturesEXT](VkPhysicalDeviceFragmentDensityMap2FeaturesEXT.html), [VkPhysicalDeviceFragmentDensityMapFeaturesEXT](VkPhysicalDeviceFragmentDensityMapFeaturesEXT.html), [VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE](VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE.html), [VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT](VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT.html), [VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR](VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR.html), [VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT](VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT.html), [VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV](VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV.html), [VkPhysicalDeviceFragmentShadingRateFeaturesKHR](VkPhysicalDeviceFragmentShadingRateFeaturesKHR.html), [VkPhysicalDeviceFrameBoundaryFeaturesEXT](VkPhysicalDeviceFrameBoundaryFeaturesEXT.html), [VkPhysicalDeviceGlobalPriorityQueryFeatures](VkPhysicalDeviceGlobalPriorityQueryFeatures.html), [VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT](VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT.html), [VkPhysicalDeviceHdrVividFeaturesHUAWEI](VkPhysicalDeviceHdrVividFeaturesHUAWEI.html), [VkPhysicalDeviceHostImageCopyFeatures](VkPhysicalDeviceHostImageCopyFeatures.html), [VkPhysicalDeviceHostQueryResetFeatures](VkPhysicalDeviceHostQueryResetFeatures.html), [VkPhysicalDeviceImage2DViewOf3DFeaturesEXT](VkPhysicalDeviceImage2DViewOf3DFeaturesEXT.html), [VkPhysicalDeviceImageAlignmentControlFeaturesMESA](VkPhysicalDeviceImageAlignmentControlFeaturesMESA.html), [VkPhysicalDeviceImageCompressionControlFeaturesEXT](VkPhysicalDeviceImageCompressionControlFeaturesEXT.html), [VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT](VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT.html), [VkPhysicalDeviceImageProcessing2FeaturesQCOM](VkPhysicalDeviceImageProcessing2FeaturesQCOM.html), [VkPhysicalDeviceImageProcessingFeaturesQCOM](VkPhysicalDeviceImageProcessingFeaturesQCOM.html), [VkPhysicalDeviceImageRobustnessFeatures](VkPhysicalDeviceImageRobustnessFeatures.html), [VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT](VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT.html), [VkPhysicalDeviceImageViewMinLodFeaturesEXT](VkPhysicalDeviceImageViewMinLodFeaturesEXT.html), [VkPhysicalDeviceImagelessFramebufferFeatures](VkPhysicalDeviceImagelessFramebufferFeatures.html), [VkPhysicalDeviceIndexTypeUint8Features](VkPhysicalDeviceIndexTypeUint8Features.html), [VkPhysicalDeviceInheritedViewportScissorFeaturesNV](VkPhysicalDeviceInheritedViewportScissorFeaturesNV.html), [VkPhysicalDeviceInlineUniformBlockFeatures](VkPhysicalDeviceInlineUniformBlockFeatures.html), [VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR](VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR.html), [VkPhysicalDeviceInvocationMaskFeaturesHUAWEI](VkPhysicalDeviceInvocationMaskFeaturesHUAWEI.html), [VkPhysicalDeviceLegacyDitheringFeaturesEXT](VkPhysicalDeviceLegacyDitheringFeaturesEXT.html), [VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT](VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT.html), [VkPhysicalDeviceLineRasterizationFeatures](VkPhysicalDeviceLineRasterizationFeatures.html), [VkPhysicalDeviceLinearColorAttachmentFeaturesNV](VkPhysicalDeviceLinearColorAttachmentFeaturesNV.html), [VkPhysicalDeviceMaintenance10FeaturesKHR](VkPhysicalDeviceMaintenance10FeaturesKHR.html), [VkPhysicalDeviceMaintenance4Features](VkPhysicalDeviceMaintenance4Features.html), [VkPhysicalDeviceMaintenance5Features](VkPhysicalDeviceMaintenance5Features.html), [VkPhysicalDeviceMaintenance6Features](VkPhysicalDeviceMaintenance6Features.html), [VkPhysicalDeviceMaintenance7FeaturesKHR](VkPhysicalDeviceMaintenance7FeaturesKHR.html), [VkPhysicalDeviceMaintenance8FeaturesKHR](VkPhysicalDeviceMaintenance8FeaturesKHR.html), [VkPhysicalDeviceMaintenance9FeaturesKHR](VkPhysicalDeviceMaintenance9FeaturesKHR.html), [VkPhysicalDeviceMapMemoryPlacedFeaturesEXT](VkPhysicalDeviceMapMemoryPlacedFeaturesEXT.html), [VkPhysicalDeviceMemoryDecompressionFeaturesEXT](VkPhysicalDeviceMemoryDecompressionFeaturesEXT.html), [VkPhysicalDeviceMemoryPriorityFeaturesEXT](VkPhysicalDeviceMemoryPriorityFeaturesEXT.html), [VkPhysicalDeviceMeshShaderFeaturesEXT](VkPhysicalDeviceMeshShaderFeaturesEXT.html), [VkPhysicalDeviceMeshShaderFeaturesNV](VkPhysicalDeviceMeshShaderFeaturesNV.html), [VkPhysicalDeviceMultiDrawFeaturesEXT](VkPhysicalDeviceMultiDrawFeaturesEXT.html), [VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT](VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT.html), [VkPhysicalDeviceMultiviewFeatures](VkPhysicalDeviceMultiviewFeatures.html), [VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM](VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM.html), [VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM](VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM.html), [VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT.html), [VkPhysicalDeviceNestedCommandBufferFeaturesEXT](VkPhysicalDeviceNestedCommandBufferFeaturesEXT.html), [VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT](VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT.html), [VkPhysicalDeviceOpacityMicromapFeaturesEXT](VkPhysicalDeviceOpacityMicromapFeaturesEXT.html), [VkPhysicalDeviceOpticalFlowFeaturesNV](VkPhysicalDeviceOpticalFlowFeaturesNV.html), [VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT](VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT.html), [VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV](VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV.html), [VkPhysicalDevicePerStageDescriptorSetFeaturesNV](VkPhysicalDevicePerStageDescriptorSetFeaturesNV.html), [VkPhysicalDevicePerformanceCountersByRegionFeaturesARM](VkPhysicalDevicePerformanceCountersByRegionFeaturesARM.html), [VkPhysicalDevicePerformanceQueryFeaturesKHR](VkPhysicalDevicePerformanceQueryFeaturesKHR.html), [VkPhysicalDevicePipelineBinaryFeaturesKHR](VkPhysicalDevicePipelineBinaryFeaturesKHR.html), [VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC](VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC.html), [VkPhysicalDevicePipelineCreationCacheControlFeatures](VkPhysicalDevicePipelineCreationCacheControlFeatures.html), [VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR](VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR.html), [VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT](VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT.html), [VkPhysicalDevicePipelineOpacityMicromapFeaturesARM](VkPhysicalDevicePipelineOpacityMicromapFeaturesARM.html), [VkPhysicalDevicePipelinePropertiesFeaturesEXT](VkPhysicalDevicePipelinePropertiesFeaturesEXT.html), [VkPhysicalDevicePipelineProtectedAccessFeatures](VkPhysicalDevicePipelineProtectedAccessFeatures.html), [VkPhysicalDevicePipelineRobustnessFeatures](VkPhysicalDevicePipelineRobustnessFeatures.html), [VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html), [VkPhysicalDevicePresentBarrierFeaturesNV](VkPhysicalDevicePresentBarrierFeaturesNV.html), [VkPhysicalDevicePresentId2FeaturesKHR](VkPhysicalDevicePresentId2FeaturesKHR.html), [VkPhysicalDevicePresentIdFeaturesKHR](VkPhysicalDevicePresentIdFeaturesKHR.html), [VkPhysicalDevicePresentMeteringFeaturesNV](VkPhysicalDevicePresentMeteringFeaturesNV.html), [VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR](VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR.html), [VkPhysicalDevicePresentTimingFeaturesEXT](VkPhysicalDevicePresentTimingFeaturesEXT.html), [VkPhysicalDevicePresentWait2FeaturesKHR](VkPhysicalDevicePresentWait2FeaturesKHR.html), [VkPhysicalDevicePresentWaitFeaturesKHR](VkPhysicalDevicePresentWaitFeaturesKHR.html), [VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT](VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT.html), [VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT](VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT.html), [VkPhysicalDevicePrivateDataFeatures](VkPhysicalDevicePrivateDataFeatures.html), [VkPhysicalDeviceProtectedMemoryFeatures](VkPhysicalDeviceProtectedMemoryFeatures.html), [VkPhysicalDeviceProvokingVertexFeaturesEXT](VkPhysicalDeviceProvokingVertexFeaturesEXT.html), [VkPhysicalDevicePushConstantBankFeaturesNV](VkPhysicalDevicePushConstantBankFeaturesNV.html), [VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT](VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT.html), [VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT](VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT.html), [VkPhysicalDeviceRawAccessChainsFeaturesNV](VkPhysicalDeviceRawAccessChainsFeaturesNV.html), [VkPhysicalDeviceRayQueryFeaturesKHR](VkPhysicalDeviceRayQueryFeaturesKHR.html), [VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT](VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT.html), [VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV](VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV.html), [VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV](VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV.html), [VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR](VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR.html), [VkPhysicalDeviceRayTracingMotionBlurFeaturesNV](VkPhysicalDeviceRayTracingMotionBlurFeaturesNV.html), [VkPhysicalDeviceRayTracingPipelineFeaturesKHR](VkPhysicalDeviceRayTracingPipelineFeaturesKHR.html), [VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR](VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR.html), [VkPhysicalDeviceRayTracingValidationFeaturesNV](VkPhysicalDeviceRayTracingValidationFeaturesNV.html), [VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG](VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG.html), [VkPhysicalDeviceRenderPassStripedFeaturesARM](VkPhysicalDeviceRenderPassStripedFeaturesARM.html), [VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV](VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV.html), [VkPhysicalDeviceRobustness2FeaturesKHR](VkPhysicalDeviceRobustness2FeaturesKHR.html), [VkPhysicalDeviceSamplerYcbcrConversionFeatures](VkPhysicalDeviceSamplerYcbcrConversionFeatures.html), [VkPhysicalDeviceScalarBlockLayoutFeatures](VkPhysicalDeviceScalarBlockLayoutFeatures.html), [VkPhysicalDeviceSchedulingControlsFeaturesARM](VkPhysicalDeviceSchedulingControlsFeaturesARM.html), [VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures](VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures.html), [VkPhysicalDeviceShader64BitIndexingFeaturesEXT](VkPhysicalDeviceShader64BitIndexingFeaturesEXT.html), [VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV](VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV.html), [VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT](VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT.html), [VkPhysicalDeviceShaderAtomicFloatFeaturesEXT](VkPhysicalDeviceShaderAtomicFloatFeaturesEXT.html), [VkPhysicalDeviceShaderAtomicInt64Features](VkPhysicalDeviceShaderAtomicInt64Features.html), [VkPhysicalDeviceShaderBfloat16FeaturesKHR](VkPhysicalDeviceShaderBfloat16FeaturesKHR.html), [VkPhysicalDeviceShaderClockFeaturesKHR](VkPhysicalDeviceShaderClockFeaturesKHR.html), [VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM](VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM.html), [VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures](VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures.html), [VkPhysicalDeviceShaderDrawParametersFeatures](VkPhysicalDeviceShaderDrawParametersFeatures.html), [VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD](VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD.html), [VkPhysicalDeviceShaderEnqueueFeaturesAMDX](VkPhysicalDeviceShaderEnqueueFeaturesAMDX.html), [VkPhysicalDeviceShaderExpectAssumeFeatures](VkPhysicalDeviceShaderExpectAssumeFeatures.html), [VkPhysicalDeviceShaderFloat16Int8Features](VkPhysicalDeviceShaderFloat16Int8Features.html), [VkPhysicalDeviceShaderFloat8FeaturesEXT](VkPhysicalDeviceShaderFloat8FeaturesEXT.html), [VkPhysicalDeviceShaderFloatControls2Features](VkPhysicalDeviceShaderFloatControls2Features.html), [VkPhysicalDeviceShaderFmaFeaturesKHR](VkPhysicalDeviceShaderFmaFeaturesKHR.html), [VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT](VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT.html), [VkPhysicalDeviceShaderImageFootprintFeaturesNV](VkPhysicalDeviceShaderImageFootprintFeaturesNV.html), [VkPhysicalDeviceShaderInstrumentationFeaturesARM](VkPhysicalDeviceShaderInstrumentationFeaturesARM.html), [VkPhysicalDeviceShaderIntegerDotProductFeatures](VkPhysicalDeviceShaderIntegerDotProductFeatures.html), [VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL](VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL.html), [VkPhysicalDeviceShaderLongVectorFeaturesEXT](VkPhysicalDeviceShaderLongVectorFeaturesEXT.html), [VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR](VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR.html), [VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE](VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE.html), [VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT](VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT.html), [VkPhysicalDeviceShaderObjectFeaturesEXT](VkPhysicalDeviceShaderObjectFeaturesEXT.html), [VkPhysicalDeviceShaderQuadControlFeaturesKHR](VkPhysicalDeviceShaderQuadControlFeaturesKHR.html), [VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR](VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR.html), [VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT](VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT.html), [VkPhysicalDeviceShaderSMBuiltinsFeaturesNV](VkPhysicalDeviceShaderSMBuiltinsFeaturesNV.html), [VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures](VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures.html), [VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT](VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT.html), [VkPhysicalDeviceShaderSubgroupRotateFeatures](VkPhysicalDeviceShaderSubgroupRotateFeatures.html), [VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR](VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR.html), [VkPhysicalDeviceShaderTerminateInvocationFeatures](VkPhysicalDeviceShaderTerminateInvocationFeatures.html), [VkPhysicalDeviceShaderTileImageFeaturesEXT](VkPhysicalDeviceShaderTileImageFeaturesEXT.html), [VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT](VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT.html), [VkPhysicalDeviceShaderUntypedPointersFeaturesKHR](VkPhysicalDeviceShaderUntypedPointersFeaturesKHR.html), [VkPhysicalDeviceShadingRateImageFeaturesNV](VkPhysicalDeviceShadingRateImageFeaturesNV.html), [VkPhysicalDeviceSubgroupSizeControlFeatures](VkPhysicalDeviceSubgroupSizeControlFeatures.html), [VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT](VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT.html), [VkPhysicalDeviceSubpassShadingFeaturesHUAWEI](VkPhysicalDeviceSubpassShadingFeaturesHUAWEI.html), [VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR](VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR.html), [VkPhysicalDeviceSynchronization2Features](VkPhysicalDeviceSynchronization2Features.html), [VkPhysicalDeviceTensorFeaturesARM](VkPhysicalDeviceTensorFeaturesARM.html), [VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT](VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT.html), [VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT](VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT.html), [VkPhysicalDeviceTextureCompressionASTCHDRFeatures](VkPhysicalDeviceTextureCompressionASTCHDRFeatures.html), [VkPhysicalDeviceTileMemoryHeapFeaturesQCOM](VkPhysicalDeviceTileMemoryHeapFeaturesQCOM.html), [VkPhysicalDeviceTilePropertiesFeaturesQCOM](VkPhysicalDeviceTilePropertiesFeaturesQCOM.html), [VkPhysicalDeviceTileShadingFeaturesQCOM](VkPhysicalDeviceTileShadingFeaturesQCOM.html), [VkPhysicalDeviceTimelineSemaphoreFeatures](VkPhysicalDeviceTimelineSemaphoreFeatures.html), [VkPhysicalDeviceTransformFeedbackFeaturesEXT](VkPhysicalDeviceTransformFeedbackFeaturesEXT.html), [VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR](VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR.html), [VkPhysicalDeviceUniformBufferStandardLayoutFeatures](VkPhysicalDeviceUniformBufferStandardLayoutFeatures.html), [VkPhysicalDeviceVariablePointersFeatures](VkPhysicalDeviceVariablePointersFeatures.html), [VkPhysicalDeviceVertexAttributeDivisorFeatures](VkPhysicalDeviceVertexAttributeDivisorFeatures.html), [VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT](VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT.html), [VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT](VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT.html), [VkPhysicalDeviceVideoDecodeVP9FeaturesKHR](VkPhysicalDeviceVideoDecodeVP9FeaturesKHR.html), [VkPhysicalDeviceVideoEncodeAV1FeaturesKHR](VkPhysicalDeviceVideoEncodeAV1FeaturesKHR.html), [VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR](VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR.html), [VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR](VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR.html), [VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE](VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE.html), [VkPhysicalDeviceVideoMaintenance1FeaturesKHR](VkPhysicalDeviceVideoMaintenance1FeaturesKHR.html), [VkPhysicalDeviceVideoMaintenance2FeaturesKHR](VkPhysicalDeviceVideoMaintenance2FeaturesKHR.html), [VkPhysicalDeviceVulkan11Features](VkPhysicalDeviceVulkan11Features.html), [VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html), [VkPhysicalDeviceVulkan13Features](VkPhysicalDeviceVulkan13Features.html), [VkPhysicalDeviceVulkan14Features](VkPhysicalDeviceVulkan14Features.html), [VkPhysicalDeviceVulkanMemoryModelFeatures](VkPhysicalDeviceVulkanMemoryModelFeatures.html), [VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR](VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR.html), [VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT](VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT.html), [VkPhysicalDeviceYcbcrDegammaFeaturesQCOM](VkPhysicalDeviceYcbcrDegammaFeaturesQCOM.html), [VkPhysicalDeviceYcbcrImageArraysFeaturesEXT](VkPhysicalDeviceYcbcrImageArraysFeaturesEXT.html), [VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT](VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT.html), or [VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures](VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures.html)

* 
[](#VUID-VkDeviceCreateInfo-sType-unique) VUID-VkDeviceCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkDeviceDeviceMemoryReportCreateInfoEXT](VkDeviceDeviceMemoryReportCreateInfoEXT.html) or [VkDevicePrivateDataCreateInfo](VkDevicePrivateDataCreateInfo.html)

* 
[](#VUID-VkDeviceCreateInfo-flags-zerobitmask) VUID-VkDeviceCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDeviceCreateInfo-pQueueCreateInfos-parameter) VUID-VkDeviceCreateInfo-pQueueCreateInfos-parameter

 If `queueCreateInfoCount` is not `0`, `pQueueCreateInfos` **must** be a valid pointer to an array of `queueCreateInfoCount` valid [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html) structures

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-parameter) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-parameter

 If `enabledExtensionCount` is not `0`, `ppEnabledExtensionNames` **must** be a valid pointer to an array of `enabledExtensionCount` null-terminated UTF-8 strings

* 
[](#VUID-VkDeviceCreateInfo-pEnabledFeatures-parameter) VUID-VkDeviceCreateInfo-pEnabledFeatures-parameter

 If `pEnabledFeatures` is not `NULL`, `pEnabledFeatures` **must** be a valid pointer to a valid [VkPhysicalDeviceFeatures](VkPhysicalDeviceFeatures.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDeviceCreateFlags](VkDeviceCreateFlags.html), [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html), [VkPhysicalDeviceFeatures](VkPhysicalDeviceFeatures.html), [VkStructureType](VkStructureType.html), [vkCreateDevice](vkCreateDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
