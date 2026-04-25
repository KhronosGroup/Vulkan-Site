# vkBuildMicromapsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBuildMicromapsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBuildMicromapsEXT - Build a micromap on the host

To build micromaps on the host, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkBuildMicromapsEXT(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    uint32_t                                    infoCount,
    const VkMicromapBuildInfoEXT*               pInfos);

* 
`device` is the `VkDevice` for which the micromaps are being
built.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VkDeferredOperationKHR.html) to
[request deferral](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`infoCount` is the number of micromaps to build.
It specifies the number of the `pInfos` that **must** be provided.

* 
`pInfos` is a pointer to an array of `infoCount`
[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html) structures defining the geometry used to
build each micromap.

This command fulfills the same task as [vkCmdBuildMicromapsEXT](vkCmdBuildMicromapsEXT.html) but is
executed by the host.

The `vkBuildMicromapsEXT` command provides the ability to initiate
multiple micromaps builds, however there is no ordering or synchronization
implied between any of the individual micromap builds.

|  | This means that there **cannot** be any memory aliasing between any micromap
| --- | --- |
memories or scratch memories being used by any of the builds. |

Valid Usage

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07461) VUID-vkBuildMicromapsEXT-pInfos-07461

For each `pInfos`[i], `dstMicromap` **must** have been created with
a value of [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)::`size` greater than or
equal to the memory size required by the build operation, as returned by
[vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html) with `pBuildInfo` =
`pInfos`[i]

* 
[](#VUID-vkBuildMicromapsEXT-mode-07462) VUID-vkBuildMicromapsEXT-mode-07462

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildMicromapModeEXT](VkBuildMicromapModeEXT.html) value

* 
[](#VUID-vkBuildMicromapsEXT-dstMicromap-07463) VUID-vkBuildMicromapsEXT-dstMicromap-07463

The `dstMicromap` member of any element of `pInfos` **must** be a
valid [VkMicromapEXT](VkMicromapEXT.html) handle

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07464) VUID-vkBuildMicromapsEXT-pInfos-07464

For each element of `pInfos` its `type` member **must** match the
value of [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)::`type` when its
`dstMicromap` was created

* 
[](#VUID-vkBuildMicromapsEXT-dstMicromap-07465) VUID-vkBuildMicromapsEXT-dstMicromap-07465

The range of memory backing the `dstMicromap` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `dstMicromap` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkBuildMicromapsEXT-dstMicromap-07466) VUID-vkBuildMicromapsEXT-dstMicromap-07466

The range of memory backing the `dstMicromap` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any element of
`pInfos` (including the same element), which is accessed by this
command

* 
[](#VUID-vkBuildMicromapsEXT-scratchData-07467) VUID-vkBuildMicromapsEXT-scratchData-07467

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07552) VUID-vkBuildMicromapsEXT-pInfos-07552

For each element of `pInfos`, the `buffer` used to create its
`dstMicromap` member **must** be bound to host-visible device memory

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07553) VUID-vkBuildMicromapsEXT-pInfos-07553

For each element of `pInfos`, all referenced addresses of
`pInfos`[i].`data.hostAddress` **must** be valid host memory

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07554) VUID-vkBuildMicromapsEXT-pInfos-07554

For each element of `pInfos`, all referenced addresses of
`pInfos`[i].`triangleArray.hostAddress` **must** be valid host
memory

* 
[](#VUID-vkBuildMicromapsEXT-micromapHostCommands-07555) VUID-vkBuildMicromapsEXT-micromapHostCommands-07555

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../../../../spec/latest/chapters/features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07556) VUID-vkBuildMicromapsEXT-pInfos-07556

If `pInfos`[i].`mode` is [VK_BUILD_MICROMAP_MODE_BUILD_EXT](VkBuildMicromapModeEXT.html),
and N is not `0`, then all addresses between
`pInfos`[i].`scratchData.hostAddress` and
`pInfos`[i].`scratchData.hostAddress` +  N - 1 **must**
be valid host memory, where N is given by the value of
[VkMicromapBuildSizesInfoEXT](VkMicromapBuildSizesInfoEXT.html)::`buildScratchSize` returned from
a call to [vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html) with an identical
[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html) structure

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07557) VUID-vkBuildMicromapsEXT-pInfos-07557

For each element of `pInfos`, the `buffer` used to create its
`dstMicromap` member **must** be bound to memory that was not allocated
with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkBuildMicromapsEXT-device-parameter) VUID-vkBuildMicromapsEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBuildMicromapsEXT-deferredOperation-parameter) VUID-vkBuildMicromapsEXT-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-parameter) VUID-vkBuildMicromapsEXT-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html) structures

* 
[](#VUID-vkBuildMicromapsEXT-infoCount-arraylength) VUID-vkBuildMicromapsEXT-infoCount-arraylength

 `infoCount` **must** be greater than `0`

* 
[](#VUID-vkBuildMicromapsEXT-deferredOperation-parent) VUID-vkBuildMicromapsEXT-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](VkResult.html)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html), [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkBuildMicromapsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
