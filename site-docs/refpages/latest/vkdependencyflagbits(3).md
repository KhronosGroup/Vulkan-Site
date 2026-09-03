# VkDependencyFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDependencyFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDependencyFlagBits - Bitmask specifying how execution and memory dependencies are formed

Bits which **can** be set in `vkCmdPipelineBarrier`::`dependencyFlags`,
specifying how execution and memory dependencies are formed, are:

// Provided by VK_VERSION_1_0
typedef enum VkDependencyFlagBits {
    VK_DEPENDENCY_BY_REGION_BIT = 0x00000001,
  // Provided by VK_VERSION_1_1
    VK_DEPENDENCY_DEVICE_GROUP_BIT = 0x00000004,
  // Provided by VK_VERSION_1_1
    VK_DEPENDENCY_VIEW_LOCAL_BIT = 0x00000002,
  // Provided by VK_EXT_attachment_feedback_loop_layout
    VK_DEPENDENCY_FEEDBACK_LOOP_BIT_EXT = 0x00000008,
  // Provided by VK_KHR_maintenance8
    VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR = 0x00000020,
  // Provided by VK_KHR_maintenance9
    VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR = 0x00000040,
  // Provided by VK_KHR_multiview
    VK_DEPENDENCY_VIEW_LOCAL_BIT_KHR = VK_DEPENDENCY_VIEW_LOCAL_BIT,
  // Provided by VK_KHR_device_group
    VK_DEPENDENCY_DEVICE_GROUP_BIT_KHR = VK_DEPENDENCY_DEVICE_GROUP_BIT,
} VkDependencyFlagBits;

* 
[VK_DEPENDENCY_BY_REGION_BIT](#) specifies that dependencies will be
split into multiple [    framebuffer-local regions](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions) according to the (x,y,layer,sample)
coordinates.

* 
[VK_DEPENDENCY_VIEW_LOCAL_BIT](#) specifies that dependencies will be
split into multiple [    framebuffer-local regions](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions) according to the view.

* 
[VK_DEPENDENCY_DEVICE_GROUP_BIT](#) specifies that dependencies are
[non-device-local](../../../../spec/latest/chapters/synchronization.html#synchronization-device-local-dependencies).

* 
[VK_DEPENDENCY_FEEDBACK_LOOP_BIT_EXT](#) specifies that the render pass
will write to and read from the same image with
[feedback loop enabled](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop).

* 
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#)
specifies that source and destination stages are not ignored when
performing a [queue family ownership    transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).

* 
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#) specifies that the access
scopes of [vkCmdSetEvent2](vkCmdSetEvent2.html) and [vkCmdWaitEvents2](vkCmdWaitEvents2.html) do not need to
match for a given event when it is specified in both commands, and the
access scope of [vkCmdSetEvent2](vkCmdSetEvent2.html) is empty.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDependencyFlags](VkDependencyFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkDependencyFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
