# VK_KHR_internally_synchronized_queues

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_internally_synchronized_queues.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Proposal](#_proposal)
- [3. Issues](#_issues)
- [3.1. RESOLVED: Should this be a device-wide or a per-queue opt-in?](#_resolved_should_this_be_a_device_wide_or_a_per_queue_opt_in)
- [3.1._RESOLVED:_Should_this_be_a_device-wide_or_a_per-queue_opt-in?](#_resolved_should_this_be_a_device_wide_or_a_per_queue_opt_in)
- [3.2. RESOLVED: Could it be possible for internal synchronization to be enabled after device creation?](#_resolved_could_it_be_possible_for_internal_synchronization_to_be_enabled_after_device_creation)
- [3.2._RESOLVED:_Could_it_be_possible_for_internal_synchronization_to_be_enabled_after_device_creation?](#_resolved_could_it_be_possible_for_internal_synchronization_to_be_enabled_after_device_creation)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Proposal](#_proposal)
[3. Issues](#_issues)

[3.1. RESOLVED: Should this be a device-wide or a per-queue opt-in?](#_resolved_should_this_be_a_device_wide_or_a_per_queue_opt_in)
[3.2. RESOLVED: Could it be possible for internal synchronization to be enabled after device creation?](#_resolved_could_it_be_possible_for_internal_synchronization_to_be_enabled_after_device_creation)

This extension allows the application to opt in for queues to be internally synchronized, eliminating the need to externally synchronize operations performed on the corresponding queues.

Vulkan queues currently require external synchronization.
This is optimal if the application does not in fact need to synchronize access to the queue, for example because it is single-threaded, or otherwise already synchronizes access to the context in which queue operations are performed for various reasons.

However, if the application *does* need to perform additional synchronization because of this requirements, it encounters several shortcomings.

First, when an application has multiple modules or uses third party libraries that need to submit work to queues, all of these components have to align on a way to ensure mutual exclusive access to those queues at any given moment.
This significantly complicates and tangles the interacting components due to requiring additional side-channels / interfaces beyond just sharing the Vulkan handles.

Second, certain queue operations such as `vkQueuePresentKHR` may involve expensive operations that do not actually require mutual exclusion for the entire duration of the command’s execution.
In such cases, external synchronization reduces parallelism by locking the entire API call.

This proposal adds a new flag that enables applications to opt in for queues to be internally synchronized.

A new `VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR` flag can be specified in `VkDeviceQueueCreateInfo::flags` to request the corresponding queues to be created with internal synchronization.
This enables creating individual queues with either external or internal synchronization even from the same queue family, similar to `VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT`, as `VkDeviceCreateInfo::pQueueCreateInfos` can contain multiple entries with the same queue family index.

The following feature advertises the availability of this functionality:

typedef struct VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           internallySynchronizedQueues;
} VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR;

Per queue for increased flexibility.
If any queue does not need synchronization, it is preferred to *not* opt into internal synchronization for efficiency.

No.

This functionality would be useful in theory for middle layers to take advantage of internal synchronization for simplicity even if they are unable to hook into device creation entry points.
However, this ability is impractical for several reasons:

* 
The middle layer still cannot enable the extension and its feature if it cannot hook into these entry points

* 
Enabling synchronization at arbitrary points leads to race conditions
