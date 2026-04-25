# VK_KHR_timeline_semaphore(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_timeline_semaphore.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_timeline_semaphore](#VK_KHR_timeline_semaphore)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_timeline_semaphore - device extension

**Name String**

`VK_KHR_timeline_semaphore`

**Extension Type**

Device extension

**Registered Extension Number**

208

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Faith Ekstrand [gfxstrand](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_timeline_semaphore] @gfxstrand%0A*Here describe the issue or question you have about the VK_KHR_timeline_semaphore extension*)

**Last Modified Date**

2019-06-12

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension interacts with
`[VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html)`

* 
This extension interacts with `[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html)`

* 
This extension interacts with `[VK_KHR_external_semaphore_win32](VK_KHR_external_semaphore_win32.html)`

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Yuriy O’Donnell, Epic Games

* 
Faith Ekstrand, Intel

* 
Jesse Hall, Google

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Daniel Rakos, AMD

* 
Ray Smith, Arm

This extension introduces a new type of semaphore that has an integer
payload identifying a point in a timeline.
Such timeline semaphores support the following operations:

* 
Host query - A host operation that allows querying the payload of the
timeline semaphore.

* 
Host wait - A host operation that allows a blocking wait for a timeline
semaphore to reach a specified value.

* 
Host signal - A host operation that allows advancing the timeline
semaphore to a specified value.

* 
Device wait - A device operation that allows waiting for a timeline
semaphore to reach a specified value.

* 
Device signal - A device operation that allows advancing the timeline
semaphore to a specified value.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkGetSemaphoreCounterValueKHR](vkGetSemaphoreCounterValue.html)

* 
[vkSignalSemaphoreKHR](vkSignalSemaphore.html)

* 
[vkWaitSemaphoresKHR](vkWaitSemaphores.html)

* 
[VkSemaphoreSignalInfoKHR](VkSemaphoreSignalInfo.html)

* 
[VkSemaphoreWaitInfoKHR](VkSemaphoreWaitInfo.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceTimelineSemaphoreFeaturesKHR](VkPhysicalDeviceTimelineSemaphoreFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceTimelineSemaphorePropertiesKHR](VkPhysicalDeviceTimelineSemaphoreProperties.html)

Extending [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html), [VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html):

* 
[VkSemaphoreTypeCreateInfoKHR](VkSemaphoreTypeCreateInfo.html)

Extending [VkSubmitInfo](VkSubmitInfo.html), [VkBindSparseInfo](VkBindSparseInfo.html):

* 
[VkTimelineSemaphoreSubmitInfoKHR](VkTimelineSemaphoreSubmitInfo.html)

* 
[VkSemaphoreTypeKHR](VkSemaphoreType.html)

* 
[VkSemaphoreWaitFlagBitsKHR](VkSemaphoreWaitFlagBits.html)

* 
[VkSemaphoreWaitFlagsKHR](VkSemaphoreWaitFlags.html)

* 
`VK_KHR_TIMELINE_SEMAPHORE_EXTENSION_NAME`

* 
`VK_KHR_TIMELINE_SEMAPHORE_SPEC_VERSION`

* 
Extending [VkSemaphoreType](VkSemaphoreType.html):

[VK_SEMAPHORE_TYPE_BINARY_KHR](VkSemaphoreType.html)

* 
[VK_SEMAPHORE_TYPE_TIMELINE_KHR](VkSemaphoreType.html)

Extending [VkSemaphoreWaitFlagBits](VkSemaphoreWaitFlagBits.html):

* 
[VK_SEMAPHORE_WAIT_ANY_BIT_KHR](VkSemaphoreWaitFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_SIGNAL_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_TYPE_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_WAIT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TIMELINE_SEMAPHORE_SUBMIT_INFO_KHR](VkStructureType.html)

1) Do we need a new object type for this?

**RESOLVED**: No, we just introduce a new type of semaphore object, as
`VK_KHR_external_semaphore_win32` already uses semaphores as the destination
for importing D3D12 fence objects, which are semantically close/identical to
the proposed synchronization primitive.

2) What type of payload the new synchronization primitive has?

**RESOLVED**: A 64-bit unsigned integer that can only be set to strictly
increasing values by signal operations and is not changed by wait
operations.

3) Does the new synchronization primitive have the same signal-before-wait
requirement as the existing semaphores do?

**RESOLVED**: No.
Timeline semaphores support signaling and waiting entirely asynchronously.
It is the responsibility of the application to avoid deadlock.

4) Does the new synchronization primitive allow resetting its payload?

**RESOLVED**: No, allowing the payload value to “go backwards” is
problematic.
Applications looking for reset behavior should create a new instance of the
synchronization primitive instead.

5) How do we enable host waits on the synchronization primitive?

**RESOLVED**: Both a non-blocking query of the current payload value of the
synchronization primitive, and a blocking wait operation are provided.

6) How do we enable device waits and signals on the synchronization
primitive?

**RESOLVED**: Similar to `VK_KHR_external_semaphore_win32`, this extension
introduces a new structure that can be chained to [VkSubmitInfo](VkSubmitInfo.html) to
specify the values signaled semaphores should be set to, and the values
waited semaphores need to reach.

7) Can the new synchronization primitive be used to synchronize presentation
and swapchain image acquisition operations?

**RESOLVED**: Some implementations may have problems with supporting that
directly, thus it is not allowed in this extension.

8) Do we want to support external sharing of the new synchronization
primitive type?

**RESOLVED**: Yes.
Timeline semaphore specific external sharing capabilities can be queried
using [vkGetPhysicalDeviceExternalSemaphoreProperties](vkGetPhysicalDeviceExternalSemaphoreProperties.html) by chaining the
new [VkSemaphoreTypeCreateInfoKHR](VkSemaphoreTypeCreateInfo.html) structure to its
`pExternalSemaphoreInfo` structure.
This allows having a different set of external semaphore handle types
supported for timeline semaphores vs. binary semaphores.

9) Do we need to add a host signal operation for the new synchronization
primitive type?

**RESOLVED**: Yes.
This helps in situations where one host thread submits a workload but
another host thread has the information on when the workload is ready to be
executed.

10) How should the new synchronization primitive interact with the ordering
requirements of the original `VkSemaphore`?

**RESOLVED**: Prior to calling any command which **may** cause a wait operation
on a binary semaphore, the application **must** ensure that the semaphore
signal operation that has been submitted for execution and any semaphore
signal operations on which it depends (if any) **must** have also been
submitted for execution.

11) Should we have separate feature bits for different sub-features of
timeline semaphores?

**RESOLVED**: No.
The only feature which cannot be supported universally is timeline semaphore
import/export.
For import/export, the application is already required to query available
external handle types via
[vkGetPhysicalDeviceExternalSemaphoreProperties](vkGetPhysicalDeviceExternalSemaphoreProperties.html) and provide the
semaphore type by adding a [VkSemaphoreTypeCreateInfoKHR](VkSemaphoreTypeCreateInfo.html) structure to
the `pNext` chain of [VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html) so no
new feature bit is required.

* 
Revision 1, 2018-05-10 (Faith Ekstrand)

Initial version

Revision 2, 2019-06-12 (Faith Ekstrand)

* 
Added an initialValue parameter to timeline semaphore creation

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_timeline_semaphore).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
