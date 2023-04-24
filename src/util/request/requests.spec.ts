import { describe, vi, it, expect, beforeEach, vitest } from 'vitest';
import { get, post, del, put } from './request';
import { HttpStatus } from '../../constants/httpstatus';
import { setActivePinia, createPinia } from 'pinia';
import { useLoadingStore } from '../../stores/loading/loading';
describe('Requests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  describe('get', () => {
    it('Returns response and data of type T successfully', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.OK,
        });
        vi.spyOn(res, 'json').mockImplementation(async () => 1);
  
        return res;
      });
  
      const { res, data } = await get<number>('a');
      expect(data).toBe(1);
      expect(res.status).toBe(HttpStatus.OK);
    });
  
    it('Returns response and data of type undefined successfully when status code is 204', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.NO_CONTENT
        });
  
        return res;
      });
  
      const { res, data } = await get('a');
      expect(data).toBe(undefined);
      expect(res.status).toBe(HttpStatus.NO_CONTENT);
    });

    it('Successfully calls startLoading and stopLoading', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.OK,
        });
        vi.spyOn(res, 'json').mockImplementation(async () => 1);
  
        return res;
      });

      const loading = useLoadingStore();
      vitest.spyOn(loading, 'startLoading');
      vitest.spyOn(loading, 'stopLoading');

      await get('a');
      expect(loading.startLoading).toHaveBeenCalledOnce();
      expect(loading.stopLoading).toHaveBeenCalledOnce();
    });
  });

  describe('post', () => {
    it('Returns response and data of type T successfully', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.OK,
        });
        vi.spyOn(res, 'json').mockImplementation(async () => 1);
  
        return res;
      });
  
      const { res, data } = await post<number>('a');
      expect(data).toBe(1);
      expect(res.status).toBe(HttpStatus.OK);

      const { res: res1, data: data1 } = await post<number>('a', {});
      expect(data1).toBe(1);
      expect(res1.status).toBe(HttpStatus.OK);
    });
  
    it('Returns response and data of type undefined successfully when status code is 204', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.NO_CONTENT
        });
  
        return res;
      });
  
      const { res, data } = await post('a');
      expect(data).toBe(undefined);
      expect(res.status).toBe(HttpStatus.NO_CONTENT);

      const { res: res1, data: data1 } = await post<number>('a', {});
      expect(data1).toBe(undefined);
      expect(res1.status).toBe(HttpStatus.NO_CONTENT);
    });

    it('Successfully calls startLoading and stopLoading', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.OK,
        });
        vi.spyOn(res, 'json').mockImplementation(async () => 1);
  
        return res;
      });

      const loading = useLoadingStore();
      vitest.spyOn(loading, 'startLoading');
      vitest.spyOn(loading, 'stopLoading');

      await post('a');
      expect(loading.startLoading).toHaveBeenCalledOnce();
      expect(loading.stopLoading).toHaveBeenCalledOnce();
    });
  });

  describe('put', () => {
    it('Returns response and data of type T successfully', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.OK,
        });
        vi.spyOn(res, 'json').mockImplementation(async () => 1);
  
        return res;
      });
  
      const { res, data } = await put<number>('a');
      expect(data).toBe(1);
      expect(res.status).toBe(HttpStatus.OK);

      const { res: res1, data: data1 } = await put<number>('a', {});
      expect(data1).toBe(1);
      expect(res1.status).toBe(HttpStatus.OK);
    });
  
    it('Returns response and data of type undefined successfully when status code is 204', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.NO_CONTENT
        });
  
        return res;
      });
  
      const { res, data } = await put('a');
      expect(data).toBe(undefined);
      expect(res.status).toBe(HttpStatus.NO_CONTENT);

      const { res: res1, data: data1 } = await put<number>('a', {});
      expect(data1).toBe(undefined);
      expect(res1.status).toBe(HttpStatus.NO_CONTENT);
    });

    it('Successfully calls startLoading and stopLoading', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.OK,
        });
        vi.spyOn(res, 'json').mockImplementation(async () => 1);
  
        return res;
      });

      const loading = useLoadingStore();
      vitest.spyOn(loading, 'startLoading');
      vitest.spyOn(loading, 'stopLoading');

      await put('a');
      expect(loading.startLoading).toHaveBeenCalledOnce();
      expect(loading.stopLoading).toHaveBeenCalledOnce();
    });
  });

  describe('del', () => {
    it('Returns response and data of type T successfully', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.OK,
        });
        vi.spyOn(res, 'json').mockImplementation(async () => 1);
  
        return res;
      });
  
      const { res, data } = await del<number>('a');
      expect(data).toBe(1);
      expect(res.status).toBe(HttpStatus.OK);
    });
  
    it('Returns response and data of type undefined successfully when status code is 204', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.NO_CONTENT
        });
  
        return res;
      });
  
      const { res, data } = await del('a');
      expect(data).toBe(undefined);
      expect(res.status).toBe(HttpStatus.NO_CONTENT);
    });

    it('Successfully calls startLoading and stopLoading', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.OK,
        });
        vi.spyOn(res, 'json').mockImplementation(async () => 1);
  
        return res;
      });

      const loading = useLoadingStore();
      vitest.spyOn(loading, 'startLoading');
      vitest.spyOn(loading, 'stopLoading');

      await del('a');
      expect(loading.startLoading).toHaveBeenCalledOnce();
      expect(loading.stopLoading).toHaveBeenCalledOnce();
    });
  });
});